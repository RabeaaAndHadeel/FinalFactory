const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hdel.zoabi.16@gmail.com",
    pass: "sedd xnee bhrq ccag", // Use an environment variable for security
  },
});

router.post("/send-email", async (req, res) => {
  const { email, message, attachments } = req.body;

  // Ensure attachments is an array
  if (!Array.isArray(attachments)) {
    return res.status(400).send("Invalid attachments format");
  }

  // Verify and construct attachment paths
  const verifiedAttachments = attachments
    .map((file) => {
      if (!file.path) {
        console.error("Attachment path is missing");
        return null;
      }

      const filePath = path.resolve(file.path);
      if (!fs.existsSync(filePath)) {
        console.error(`Attachment file not found: ${filePath}`);
        return null;
      }
      return { ...file, path: filePath };
    })
    .filter(Boolean);

  if (verifiedAttachments.length === 0) {
    return res.status(400).send("No valid attachments found");
  }

  const mailOptions = {
    from: "hdel.zoabi.16@gmail.com",
    to: email,
    subject: "Subject of your email",
    text: message,
    attachments: verifiedAttachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send(`Error sending email: ${error.message}`);
  }
});

module.exports = router;

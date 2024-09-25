import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderProduct from "./HeaderBid.jsx";
import ClientDatails from "./Client/ClientDatails.jsx";
import DatesProduct from "./DatesProduct.jsx";
import Notes from "./Notes.jsx";
import FactoryData from "./FactoryData.jsx";
import SketchDisplay from "../../components/sketch/SketchDisplay.jsx";
import jsPDF from "jspdf";
import axios from "axios";
import styles from "./bidInfo.module.css";
import html2canvas from "html2canvas";

function QutationInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quotation } = location.state || {};

  const invoiceRef = useRef(); // Ref for the invoice container

  // Check if quotation data is available
  if (!quotation) {
    return <p>No quotation data found.</p>;
  }

  const {
    customer,
    products,
    notes,
    date,
    discount,
    idQuotation,
    vat,
  } = quotation;

  // Calculate totals and discounts
  const totalBeforeVAT = products.reduce((acc, product) => acc + product.totalPrice, 0);
  const vatAmount = (totalBeforeVAT * vat) / 100;
  const totalWithVAT = totalBeforeVAT + vatAmount;
  const discountAmount = discount*1 || 0;
  const finalPrice = totalWithVAT - discountAmount;

  const handleSave = async () => {
    try {
      // Hide buttons before generating PDF
      document.querySelectorAll(".submit-btn, button").forEach((button) => (button.style.display = "none"));

      const invoiceElement = invoiceRef.current;
      if (!invoiceElement) {
        console.error("Error: No element with ref 'invoice-container' found.");
        alert("Invoice element not found!");
        return;
      }

      // Generate PDF from invoice element
      const canvas = await html2canvas(invoiceElement, { scale: 1 });
      document.querySelectorAll(".submit-btn, button").forEach((button) => (button.style.display = ""));

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`הצעת מחיר_${idQuotation}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSend = async () => {
    try {
      // Hide buttons before sending email
      document.querySelectorAll(".submit-btn, button").forEach((button) => (button.style.display = ""));
      const invoiceElement = invoiceRef.current;
      const canvas = await html2canvas(invoiceElement, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      document.querySelectorAll(".submit-btn, button").forEach((button) => (button.style.display = ""));

      // Generate PDF and send via email
      const doc = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const pdfBlob = doc.output("blob");
      const emailData = new FormData();
      emailData.append("pdf", pdfBlob, `הצעת מחיר_${idQuotation}.pdf`);
      emailData.append("email", customer.email);

      const response = await axios.post("/send-bid-email", emailData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from server:", response.data);
      alert("Bid details sent successfully");
    } catch (error) {
      console.error("Error sending bid email:", error.message);
      console.error("Error response data:", error.response?.data);
      alert("Error sending bid details");
    }
  };

  const handleUpdate = () => {
    navigate("/qutationData", { state: { quotation } });
  };

  return (
    <main className={styles.invoiceContainer} ref={invoiceRef}>
      <HeaderProduct
        idQuotation={idQuotation}
        handlePrint={handlePrint}
        handleSave={handleSave}
        handleSend={handleSend}
      />
      <ClientDatails
        name={customer.name}
        family={customer.family}
        address={customer.address}
      />
      <DatesProduct date={date} num={idQuotation} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>תאור פריט</th>
            <th className={styles.th}>פרופיל</th>
            <th className={styles.th}>גובה(מ"מ)</th>
            <th className={styles.th}>רוחב(מ"מ)</th>
            <th className={styles.th}>ליחידה מחיר(ש"ח)</th>
            <th className={styles.th}>כמות</th>
            <th className={styles.th}>סה"כ מחיר (ש"ח)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className={styles.td}>
                {product.description}
                {product.glassType && ` , זכוכית: ${product.glassType}`}
                {product.shutterType && `, תריס: ${product.shutterType}`}
                <SketchDisplay
                  type={product.description}
                  width={product.width }
                  length={product.height}
                />
              </td>
              <td className={styles.td}>{product.profileType}</td>
              <td className={styles.td}>{product.height}</td>
              <td className={styles.td}>{product.width}</td>
              <td className={styles.td}>{product.pricePerUnit}</td>
              <td className={styles.td}>{product.quantity}</td>
              <td className={styles.td}>{product.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.totals}>
        <p>סך הכל לפני מע"מ: {totalBeforeVAT.toFixed(2)} ש"ח</p>
        <p>מע"מ ({vat}%): {vatAmount.toFixed(2)} ש"ח</p>
        {discountAmount > 0 && <p>הנחה: {discountAmount.toFixed(2)} ש"ח</p>}
        <p>סכום סופי לתשלום: {finalPrice.toFixed(2)} ש"ח</p>
      </div>
      <Notes notes={notes} />
      <FactoryData />
      <button onClick={handleUpdate}>עדכון</button>
    </main>
  );
}

export default QutationInfo;

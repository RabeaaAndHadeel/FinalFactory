function SupplierValidation(values) {
  // Regular expression for validating an email
  const mail_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //[a-zA-Z0-9._-]+: One or more alphanumeric characters, dots, underscores, or hyphens.
  //@: The "@" symbol.
  //[a-zA-Z0-9.-]+: One or more alphanumeric characters, dots, or hyphens (domain part).
  //\.: A literal dot.
  //[a-zA-Z]{2,}: At least two alphabetic characters (top-level domain).
  let error = {}; // Initialize an object to store validation errors
  const id_pattern = /^\d{9}$/; //It should be a string of 9 digits
  const phone_pattern = /^\d{10}$/; //It should be a string of 10 digits
  const name_pattern = /^[a-zA-Z]+$/; //It should be a string of 30 digits
  //check if the name field is empty
  if (values.name === "") {
    error.name = " שם זה שדה חובה";
  } else if (!name_pattern.test(values.name))
    error.name = "שם צריך להיות בנוי מאותיות גדולות וקטנות";
  else {
    error.name = ""; // Reset error if valid
  }
  // Check if the ID field is empty
  if (values.id === "") error.id = " ת.ז זה שדה חובה";
  // Test the ID against the regular expression
  else if (!id_pattern.test(values.id))
    error.id = "ת.ז צריכה להיות מורכבת מ 9 מספרים";
  else if (values.id < 0) {
    error.id = "ת.ז לא יכולה להיות מורכבת ממספר שלילי";
  } else {
    error.id = ""; // Reset error if valid
  }
  //check if the name field is empty
  if (values.address === "") {
    error.address = " כתובת זה שדה חובה";
  } else {
    error.address = ""; // Reset error if valid
  }
  if (values.mail === "") {
    error.mail = " מייל זה שדה חובה";
  } else if (!mail_pattern.test(values.mail))
    error.mail = " .com המייל צריך להכיל @ ו ";
  else {
    error.mail = "";
  }
  //check if the name field is empty
  if (values.contact === "") {
    error.contact = " איש קשר זה שדה חובה";
  } else {
    error.contact = ""; // Reset error if valid
  }
  if (values.phone === "") {
    error.phone = " מספר טלפון שדה חובה";
  } else if (!phone_pattern.test(values.phone))
    error.phone = "מספר טלפון צריך להיות מורכב מ 10 מספרים";
  else if (values.phone < 0) {
    error.phone = "מספר טלפון לא יבול להיות שלילי";
  } else {
    error.phone = "";
  }
  return error;
}
export default SupplierValidation; // Export the Validation function

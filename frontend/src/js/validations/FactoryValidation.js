import Common_validation1 from "./Common_validation1";
function FactoryValidation(values) {
  const address_pattern = /^[\u0590-\u05FF\s]+$/;
  const vat_pattern = /^\d{2}$/;
  const contact_pattern = /^[\u0590-\u05FF\s]+$/; // Allows only Hebrew letters and spaces

  let errors = {};
  // Call common validation and merge errors
  const commonErrors = Common_validation1(values);
  errors = { ...errors, ...commonErrors };
  if (!values.address) {
    errors.address = "כתובת זה שדה חובה";
  } else if (!address_pattern.test(values.address)) {
    errors.address =
      "כתובת צריכה להיות מורכבת מאותיות גדולות, קטנות, מספרים, או רווחים";
  }
  if (!values.vat) {
    errors.vat = "מעם זה שדה חובה";
  } else if (!vat_pattern.test(values.vat)) {
    errors.vat = "מספר עוסק מורשה צריך להיות מורכב מ-9 ספרות";
  } else if (values.vat <= 0) errors.vat = "מעם לא יכול להיות שלילי או אפס ";
  // Check if the contact field is empty
  if (!values.contact) {
    errors.contact = "איש קשר זה שדה חובה";
  } else if (!contact_pattern.test(values.contact)) {
    errors.contact = "איש קשר צריך להיות בנוי רק מאותיות עבריות ורווחים";
  }
  return errors;
}

export default FactoryValidation;

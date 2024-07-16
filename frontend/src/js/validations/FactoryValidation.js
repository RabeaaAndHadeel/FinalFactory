function FactoryValidation(values) {
  const address_pattern = /^[\u0590-\u05FF\s]+$/;
  const vat_pattern = /^\d{2}$/;
  const contact_pattern = /^[\u0590-\u05FF\s]+$/; // Allows only Hebrew letters and spaces
  const factoryName_pattern = /^[\u0590-\u05FF\s]+$/; // Allows only Hebrew letters and spaces
  const mail_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const id_pattern = /^\d{9}$/;
  const phone_pattern = /^\d{10}$/;

  let errors = {};
  if (!values.address || values.address.trim() === "") {
    errors.address = "כתובת זה שדה חובה";
  } else if (!address_pattern.test(values.address)) {
    errors.address = "כתובת צריכה להיות מורכב רק מאותיות עבריות ורווחים";
  }

  if (!values.factoryName || values.factoryName.trim() === "") {
    errors.factoryName = "שם עסק זה שדה חובה";
  } else if (!factoryName_pattern.test(values.factoryName)) {
    errors.factoryName = "שם מפעל צריך להיות מורכב רק מאותיות עבריות ורווחים";
  }

  if (!values.vat || values.vat.trim() === "") {
    errors.vat = "מעם זה שדה חובה";
  } else if (!vat_pattern.test(values.vat)) {
    errors.vat = "מעם צריך להיות מורכב מ-2 מספרים";
  } else if (values.vat <= 0) {
    errors.vat = "מעם לא יכול להיות שלילי או אפס";
  }

  if (!values.contact || values.contact.trim() === "") {
    errors.contact = "איש קשר זה שדה חובה";
  } else if (!contact_pattern.test(values.contact)) {
    errors.contact = "איש קשר צריך להיות מורכב רק מאותיות עבריות ורווחים";
  }
  if (!values.id || values.id.trim() === "") {
    errors.id = "ת.ז זה שדה חובה";
  } else if (!id_pattern.test(values.id)) {
    errors.id = "ת.ז צריכה להיות מורכבת מ-9 מספרים";
  } else if (values.id <= 0) {
    errors.id = "ת.ז לא יכולה להיות שלילית או אפס";
  }

  if (!values.email || values.email.trim() === "") {
    errors.email = "מייל זה שדה חובה";
  } else if (!mail_pattern.test(values.email)) {
    errors.email = "המייל צריך להכיל @ ו-.com";
  }

  if (!values.phoneNumber || values.phoneNumber.trim() === "") {
    errors.phoneNumber = "מספר טלפון זה שדה חובה";
  } else if (!phone_pattern.test(values.phoneNumber)) {
    errors.phoneNumber = "מספר טלפון צריך להיות מורכב מ-10 מספרים";
  } else if (values.phoneNumber < 0) {
    errors.phoneNumber = " מספר טלפון לא יכול להיות שלילי ";
  }

  return errors;
}

export default FactoryValidation;

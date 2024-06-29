function CustomerValidation(values) {
  const mail_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const id_pattern = /^\d{9}$/;
  const name_pattern = /^[a-zA-Z]+$/;
  const familyname_pattern = /^[a-zA-Z]+$/;
  const address_pattern = /^[a-zA-Z0-9\s]+$/;
  const phone_pattern = /^\d{10}$/;

  let errors = {};

  if (!values.name) {
    errors.name = "שם זה שדה חובה";
  } else if (!name_pattern.test(values.name)) {
    errors.name = "השם צריך להיות בנוי רק מאותיות גדולות או קטנות";
  }

  if (!values.family) {
    errors.family = "שם משפחה זה שדה חובה";
  } else if (!familyname_pattern.test(values.family)) {
    errors.family = "שם המשפחה צריך להיות בנוי רק מאותיות גדולות או קטנות";
  }

  if (!values.id) {
    errors.id = "ת.ז זה שדה חובה";
  } else if (!id_pattern.test(values.id)) {
    errors.id = "ת.ז צריכה להיות מורכבת מ-9 מספרים";
  }

  if (!values.address) {
    errors.address = "כתובת זה שדה חובה";
  } else if (!address_pattern.test(values.address)) {
    errors.address =
      "כתובת צריכה להיות מורכבת מאותיות גדולות, קטנות, מספרים, או רווחים";
  }

  if (!values.mail) {
    errors.mail = "מייל זה שדה חובה";
  } else if (!mail_pattern.test(values.mail)) {
    errors.mail = "המייל צריך להכיל @ ו-.com";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "מספר טלפון זה שדה חובה";
  } else if (!phone_pattern.test(values.phoneNumber)) {
    errors.phoneNumber = "מספר טלפון צריך להיות מורכב מ-10 מספרים";
  }

  return errors;
}

export default CustomerValidation;

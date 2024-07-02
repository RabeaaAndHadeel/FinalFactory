const ProductValidation = (product) => {
  let errors = {};
  const lettersPattern = /^[\u0590-\u05FF\s]+$/; // Pattern for Hebrew letters and spaces
  const numberPattern = /^\d+$/; // Pattern for numbers

  if (product.customersId === "") {
    errors.customersId = "ת.ז לקוח זה שדה חובה";
  } else if (product.customersId <= 0) {
    errors.customersId = "ת.ז לקוח לא תקין";
  } else if (!numberPattern.test(product.customersId)) {
    errors.customersId = "ת.ז לקוח צריכה להיות מורכבת מ-9 ספרות בדיוק";
  }

  if (product.type === "") {
    errors.type = "סוג מוצר זה שדה חובה";
  } else if (!lettersPattern.test(product.type)) {
    errors.type = "סוג מוצר צריך להכיל רק אותיות";
  }

  if (!product.profileType) {
    errors.profileType = "סוג פרופיל הוא חובה";
  } else if (!lettersPattern.test(product.profileType)) {
    errors.profileType = "סוג פרופיל צריך להכיל רק אותיות";
  }

  if (!product.Remarks) {
    errors.Remarks = "הערות הן חובה";
  } else if (!lettersPattern.test(product.Remarks)) {
    errors.Remarks = "הערות צריכות להכיל רק אותיות";
  }

  if (!product.width) {
    errors.width = " רוחב הוא חובה";
  } else if (!numberPattern.test(product.width)) {
    errors.width = "רוחב צריך להיות מורכב מספרים בלבד";
  } else if (product.width <= 0 || product.width > 250) {
    errors.width = "רוחב חייב להיות בין 1 ל-250";
  }

  if (!product.length) {
    errors.length = " גובה הוא חובה";
  } else if (!numberPattern.test(product.length)) {
    errors.length = "אורך צריך להיות מורכב מספרים בלבד";
  } else if (product.length <= 0 || product.length > 250) {
    errors.length = "אורך חייב להיות בין 1 ל-250";
  }

  if (!product.count) {
    errors.count = "כמות מוצר זה שדה חובה";
  } else if (!numberPattern.test(product.count)) {
    errors.count = "כמות מוצר צריכה להיות מורכבת מספרים בלבד";
  } else if (product.count < 0) {
    errors.count = " כמות מוצר לא יכולה להיות שלילית  ";
  }

  if (!product.price) {
    errors.price = "מחיר זה שדה חובה";
  } else if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
    errors.price = "מחיר צריך להיות ספרות בלבד עם עד שני ספרות אחרי הנקודה";
  } else if (product.price <= 0) {
    errors.price = "מחיר לא יכול להיות שלילי או אפס";
  }

  if (!product.date) {
    errors.date = "תאריך הוא חובה";
  } else {
    const today = new Date();
    const inputDate = new Date(product.date);
    if (inputDate < today) {
      errors.date = "תאריך לא יכול להיות בעבר";
    }
  }

  return errors;
};

export default ProductValidation;

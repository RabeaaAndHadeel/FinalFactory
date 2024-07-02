function OrderValidation(values) {
  let errors = {}; // Initialize an object to store validation errors
  const typePattern = /^[\u0590-\u05FF\s]+$/;
  // Check if the count field is empty
  if (values.count === "") {
    errors.count = "כמות מוצר זה שדה חובה";
  }
  // Test the ID against the regular expression
  else if (values.count < 0) {
    errors.count = " כמות מוצר לא יכולה להיות שלילית  ";
  }
  // Check if the order number field is empty
  if (values.orderNumber === "") {
    errors.orderNumber = "מספר הזמנה זה שדה חובה";
  }
  // Test the ID against the regular expression
  else if (values.orderNumber < 0 && values.orderNumber > 3) {
    errors.orderNumber =
      "  מספר הזמנה  לא  יכול להיות שלילי או יותר מ-3 מספרים  ";
  }
  // Check if the type field is empty
  if (values.type === "") {
    errors.type = "סוג מוצר זה שדה חובה";
  } else if (!typePattern.test(values.type)) {
    errors.type = "סוג מוצר צריך להכיל רק אותיות";
  }
  return errors; // Return the errors object
}

export default OrderValidation;

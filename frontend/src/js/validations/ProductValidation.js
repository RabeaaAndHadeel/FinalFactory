const ProductValidation = (product) => {
  let errors = {};
  if (product.customersId === "") {
    errors.customersId = "ת.ז לקוח זה שדה חובה";
  } else if (product.customersId <= 0) {
    errors.customersId = "ת.ז לקוח לא תקין";
  }
  if (!product.type) {
    errors.type = "סוג מוצר הוא חובה";
  }
  if (!product.profileType) {
    errors.profileType = "סוג פרופיל הוא חובה";
  }
  if (!product.Remarks) {
    errors.Remarks = "הערות הן חובה";
  }
  if (!product.profileType) {
    errors.profileType = "סוג פרופיל הוא חובה";
  }
  if (!product.width) {
    errors.width = " רוחב הוא חובה";
  } else if (product.width <= 0) {
    errors.width = "רוחב לא יכול להיות שלילי או אפס";
  }
  if (!product.length) {
    errors.length = " גובה הוא חובה";
  }
  else if (product.length <= 0) {
    errors.length = "אורך לא יכול להיות שלילי או אפס";
  }
  // Check if the count field is empty
  if (product.count === "") {
    errors.count = "כמות מוצר זה שדה חובה";
  }
  // Test the ID against the regular expression
  else if (product.count < 0) {
    errors.count = " כמות מוצר לא יכולה להיות שלילית  ";
  }
  if (!product.price) {
    errors.price = "מחיר זה שדה חובה";
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

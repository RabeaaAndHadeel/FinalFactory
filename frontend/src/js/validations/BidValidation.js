const BidValidation = (formData) => {
  let errors = {};
  // Number validation
  if (!formData.number.trim()) {
    errors.number = "מספר הצעה הוא שדה חובה";
  }

  // CustomersId validation
  if (!formData.customersId.trim()) {
    errors.customersId = "תעודת הזהות היא שדה חובה";
  }

  // ProfileType validation
  if (!formData.profileType.trim()) {
    errors.profileType = "סוג פרופיל הוא שדה חובה";
  }

  // VAT validation
  if (!formData.VAT.trim()) {
    errors.VAT = "מע'מ הוא שדה חובה";
  } else if (parseFloat(formData.VAT) < 0) {
    errors.VAT = "מע'מ לא יכול להיות ערך שלילי";
  }

  // Total validation
  if (!formData.total.trim()) {
    errors.total = "סך הכל הוא שדה חובה";
  } else if (parseFloat(formData.total) < 0) {
    errors.total = "סך הכל לא יכול להיות ערך שלילי";
  }

  if (!formData.date) {
    errors.date = "תאריך הוא חובה";
  } else {
    const today = new Date();
    const inputDate = new Date(formData.date);
    if (inputDate < today) {
      errors.date = "תאריך לא יכול להיות בעבר";
    }
  }
  return errors;
};

export default BidValidation;

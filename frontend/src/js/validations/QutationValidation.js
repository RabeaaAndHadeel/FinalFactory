  const QutationValidation = (quantity) =>{
    let errors = {};
    const lettersPattern = /^[\u0590-\u05FF\s]+$/; // Pattern for Hebrew letters and spaces
    const numberPattern = /^\d+$/; // Pattern for numbers

  //date validation
  if (!quantity.date) {
    errors.date = "תאריך הוא חובה";
  }

  return errors;
 };
 export default QutationValidation;
 
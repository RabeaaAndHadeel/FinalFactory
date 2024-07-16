const alphabeticalPattern = /^[\u0590-\u05FF\s]+$/;
const thicknessPattern = /^\d{1,3}$/;

function Validation(values) {
  let errors = {};

  if (!values.glassType || values.glassType === "") {
    errors.glassType = "סוג זכוכית זה שדה חובה";
  } else if (!alphabeticalPattern.test(values.glassType)) {
    errors.glassType = "סוג זכוכית צריך להכיל רק אותיות";
  }

  if (!values.Thickness || values.Thickness === "") {
    errors.Thickness = "עובי הוא שדה חובה";
  } else if (!thicknessPattern.test(values.Thickness)) {
    errors.Thickness = "עובי חייב להיות מספר שלם עד 3 ספרות";
  } else if (parseInt(values.Thickness, 10) > 300) {
    errors.Thickness = "עובי לא יכול להיות גדול מ-300";
  } else if (parseInt(values.Thickness, 10) < 0) {
    errors.Thickness = "עובי לא יכול להיות שלילי";
  }

  return errors;
}

export default Validation;

function ProfileValidation(values) {
  const id_pattern = /^\d{5}$/; // It should be a string of 5 digits
  let errors = {}; // Initialize an object to store validation errors

  // Check if the ID field is empty
  if (values.id === "") {
    errors.id = "מקט זה שדה חובה";
  }
  // Test the ID against the regular expression
  else if (!id_pattern.test(values.id) || values.id < 0) {
    errors.id = "מקט צריך להיות מורכב מ-5 לא יכול להיות שלילי מספרים";
  }
  // Check if the profile perimeter field is empty or negative
  if (values.perimeter === "") {
    errors.perimeter = "היקף זה שדה חובה";
  } else if (values.perimeter < 0) {
    errors.perimeter = "היקף לא יכול להיות שלילי";
  }

  // Check if the profile weight field is empty or negative
  if (values.weight === "") {
    errors.weight = "משקל זה שדה חובה";
  } else if (values.weight < 0) {
    errors.weight = "משקל לא יכול להיות שלילי";
  }

  return errors; // Return the errors object
}

export default ProfileValidation;

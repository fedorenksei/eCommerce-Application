export const validationErrors = {
  required: 'Field is require',
  mail: "Email must be properly formatted, contain a domain name, contain an '@' symbol separating local part and domain name (e.g., user@example.com), no contain whitespaces and domain length at least 2 characters",
  password:
    'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (such as !@#$%^&*)',
  passwordSpaces:
    'Password address must not contain leading or trailing whitespace',
  passwordSame: 'Passwords is not the same',
  name: 'Must contain at least one character and no special characters or numbers',
  postalCode: 'Code format should be like 54321',
  city: 'Must contain at least one character and no special characters or numbers',
};

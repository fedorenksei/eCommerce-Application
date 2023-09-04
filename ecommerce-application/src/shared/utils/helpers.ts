export const validateDate = (value: string) => {
  const age =
    (new Date().getTime() - +new Date(value)) / (24 * 60 * 60 * 365.25 * 1000);
  if (age < 13) {
    return 'Users must be at least 13 years old to use this service.';
  }
  if (age > 150) {
    return 'This service is intended for users under 120 years old.';
  }
};

export function capitalize(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

import {
  CustomerInputAddress,
  CustomerInputData,
  CustomerAddress,
  NewCustomerInfo,
} from '../types/interfaces';

export const newCustomerTransformInfo = (
  firstFormDate: CustomerInputData,
  secondFormData: CustomerInputAddress,
) => {
  console.log(firstFormDate);
  console.log(secondFormData);
  const shippingAddress: CustomerAddress = {
    country: secondFormData.country,
    city: secondFormData.shippingCity,
    streetName: secondFormData.shippingStreet,
    postalCode: secondFormData.shippingCode,
  };

  let billingAddress: CustomerAddress | null = null;

  const isBillingAddressNotTheSame = !secondFormData.isBillingAddressTheSame;

  if (isBillingAddressNotTheSame) {
    billingAddress = {
      country: secondFormData.country,
      city: secondFormData.billingCity!,
      streetName: secondFormData.billingStreet!,
      postalCode: secondFormData.billingCode!,
    };
  }

  const addresses: CustomerAddress[] = [shippingAddress];
  billingAddress && addresses.push(billingAddress);

  const customerInfo: NewCustomerInfo = {
    email: firstFormDate.email,
    password: firstFormDate.password,
    firstName: firstFormDate.firstName,
    lastName: firstFormDate.lastName,
    dateOfBirth: firstFormDate.dateOfBirth,
    addresses: addresses,
    shippingAddresses: [0],
    billingAddresses: isBillingAddressNotTheSame ? [1] : [0],
  };

  if (secondFormData.shippingIsDefault) {
    customerInfo.defaultShippingAddress = 0;
  }

  if (!isBillingAddressNotTheSame) {
    customerInfo.defaultBillingAddress = 0;
  }

  if (isBillingAddressNotTheSame && secondFormData.billingIsDefault) {
    customerInfo.defaultBillingAddress = 1;
  }

  console.log(customerInfo);

  return customerInfo;
};

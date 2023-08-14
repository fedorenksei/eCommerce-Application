import {
  IAddress,
  ICustomer,
  ICustomerAddress,
  INewCustomerInfo,
} from '../types/interfaces';

export const newCustomerTransformInfo = (
  firstFormDate: ICustomer,
  secondFormData: IAddress
) => {
  const shippingAddress: ICustomerAddress = {
    country: secondFormData.country,
    city: secondFormData.shippingCity,
    streetName: secondFormData.shippingStreet,
    postalCode: secondFormData.shippingCode,
  };

  let billingAddress: ICustomerAddress | null = null;

  const isBillingAddressNotTheSame =
    secondFormData.billingCity &&
    secondFormData.billingStreet &&
    secondFormData.billingCode;

  if (isBillingAddressNotTheSame) {
    billingAddress = {
      country: secondFormData.country,
      city: secondFormData.billingCity!,
      streetName: secondFormData.billingStreet!,
      postalCode: secondFormData.billingCode!,
    };
  }

  const addresses: ICustomerAddress[] = [shippingAddress];
  billingAddress && addresses.push(billingAddress);

  const customerInfo: INewCustomerInfo = {
    email: firstFormDate.email,
    password: firstFormDate.password,
    firstName: firstFormDate.firstName,
    lastname: firstFormDate.lastName,
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

  return customerInfo;
};

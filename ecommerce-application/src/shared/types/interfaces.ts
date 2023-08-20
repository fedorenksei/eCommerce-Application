import { Countries } from './enums';

export interface LoginData {
  email: string;
  password: string;
}

export interface CustomerInputData {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface FirstStepFormProps {
  customerInfo: CustomerInputData;
  key: string;
  onSubmit: (arg: CustomerInputData) => void;
}

export interface CustomerInputAddress {
  country: Countries;
  shippingCity: string;
  shippingStreet: string;
  shippingCode: string;
  shippingIsDefault?: boolean;
  billingCity?: string;
  billingStreet?: string;
  billingCode?: string;
  billingIsDefault?: boolean;
}

export interface SecondStepProps {
  customerAddress: CustomerInputAddress;
  key: string;
  onSubmit: (arg: CustomerInputAddress) => void;
  onBackClick: () => void;
}

export interface NewCustomerInfo {
  email: string;
  password: string;
  firstName: string;
  lastname: string;
  dateOfBirth: string;
  addresses: CustomerAddress[];
  shippingAddresses: number[];
  defaultShippingAddress?: number;
  billingAddresses: number[];
  defaultBillingAddress?: number;
}

export interface CustomerAddress {
  country: string;
  streetName: string;
  city: string;
  postalCode: string;
}

export interface CustomerData {
  email: string;
}

import { Countries } from './enums';

export interface ICustomer {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface IFirstStepForm {
  customerInfo: ICustomer;
  key: string;
  onSubmit: (arg: ICustomer) => void;
}

export interface IAddress {
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

export interface ISecondStepForm {
  customerAddres: IAddress;
  key: string;
  onSubmit: (arg: IAddress) => void;
  onBackClick: () => void;
}

export interface INewCustomerInfo {
  email: string;
  password: string;
  firstName: string;
  lastname: string;
  dateOfBirth: string;
  addresses: ICustomerAddress[];
  shippingAddresses: number[];
  defaultShippingAddress?: number;
  billingAddresses: number[];
  defaultBillingAddress?: number;
}

export interface ICustomerAddress {
  country: string;
  streetName: string;
  city: string;
  postalCode: string;
}

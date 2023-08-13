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
}

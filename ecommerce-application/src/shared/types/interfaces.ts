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
  isBillingAddressTheSame?: boolean;
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

export interface CategoryData {
  ancestors: Array<string>;
  id: string;
  name: {
    en: string;
  };
}

export interface Price {
  id: string;
  value: {
    centAmount: string;
  };
}

export interface ProductImage {
  url: string;
}

export interface ProductData {
  name: {
    en: string;
  };
  id: string;
  masterVariant: {
    prices: Price[];
    images: ProductImage[];
  };
  metaDescription: {
    en: string;
  };
}

export interface ProductsData {
  results: ProductData[];
  total: number;
}

export interface ProductRequestParams {
  categoryId?: null | string | undefined;
  size?: null | string | undefined;
  color?: null | string | undefined;
  gender?: null | string | undefined;
  style?: null | string | undefined;
  searchText?: null | string | undefined;
  sort?: null | string | undefined;
  page?: null | string | undefined;
  priceRange?: null | PriceParams;
}

export type PriceParams = {
  min: number;
  max: number;
};

export type VariantsParams = {
  colors: string[];
  genders: string[];
  sizes: string[];
  styles: string[];
};

export type FiltersState = {
  variantParams: VariantsParams;
  priceParams: PriceParams;
};

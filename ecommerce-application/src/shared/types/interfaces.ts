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
  lastName: string;
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

export interface CustomerAddressWithId extends CustomerAddress {
  id: string;
}

export interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: CustomerAddressWithId[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
}

export interface PersonalData {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface CategoryData {
  ancestors: Array<string>;
  id: string;
  name: {
    'en-US': string;
  };
}

export interface Price {
  id: string;
  value: {
    centAmount: string;
  };
  discounted: {
    value: {
      centAmount: string;
    };
  };
}

export interface ProductImage {
  url: string;
}

export interface ProductData {
  name: {
    'en-US': string;
  };
  id: string;
  masterVariant: {
    prices: Price[];
    images: ProductImage[];
  };
  description: {
    'en-US': string;
  };
}

export interface DetailedProductData {
  name: {
    'en-US': string;
  };
  id: string;
  masterData: {
    current: {
      description: {
        'en-US': string;
      };
      name: {
        'en-US': string;
      };
      masterVariant: {
        prices: Price[];
        images: ProductImage[];
      };
    };
  };
}

export interface ProductsData {
  results: ProductData[];
  total: number;
}

export interface ProductRequestParams {
  categoryId?: null | string | undefined;
  material?: null | string | undefined;
  color?: null | string | undefined;
  gender?: null | string | undefined;
  brand?: null | string | undefined;
  searchText?: null | string | undefined;
  sort?: null | string | undefined;
  page?: null | string | undefined;
  limit: number;
  priceRange?: null | PriceParams;
}

export type PriceParams = {
  min: number;
  max: number;
};

export type VariantsParams = {
  colors: string[];
  genders: string[];
  materials: string[];
  brands: string[];
};

export type FiltersState = {
  variantParams: VariantsParams;
  priceParams: PriceParams;
};

export interface LineItem {
  id: string;
  productId: string;
  price: number;
  productDiscountedPrice?: number;
  promoDiscountedPrice?: number;
  totalPrice: number;
  quantity: number;
  name: string;
  imageUrl: string;
}

export interface CartState {
  version: number;
  id: string;
  lineItems: LineItem[];
  totalPrice: number;
  discountedPrice: number;
  discountCodeId?: string;
  totalLineItemQuantity: number;
}

export type TextInputType = 'text' | 'password' | 'date' | 'email';

export type CustomerUpdateAction = {
  action: string;
  [index: string]: string | { [index: string]: string };
};

export type AddCartAction = {
  action: string;
  productId: string | undefined;
  variantId: number;
  quantity: number;
};

export type CartUpdateAction =
  | AddCartAction
  | {
      action: string;
      code: string;
    };

export type TextInputType = 'text' | 'password' | 'date' | 'email' | 'search';

export type CustomerUpdateAction = {
  action: string;
  addressId?: string;
  [index: string]: string | { [index: string]: string } | undefined;
};

export type AddCartAction = {
  action: string;
  productId: string | undefined;
  variantId: number;
  quantity: number;
};

export type DeleteItemAction =
  | AddCartAction
  | {
      action: string;
      lineItemId: string;
    };

export type ChangeLineAction =
  | AddCartAction
  | DeleteItemAction
  | {
      action: string;
      lineItemId: string;
      quantity: number;
    };

export type CartUpdateAction =
  | AddCartAction
  | DeleteItemAction
  | ChangeLineAction
  | {
      action: string;
      code: string;
    }
  | {
      action: 'addDiscountCode';
      code: string;
    }
  | {
      action: 'removeDiscountCode';
      discountCode: {
        typeId: 'discount-code';
        id: string;
      };
    };

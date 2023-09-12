import { LineItem } from '../types/interfaces';

interface LineItemApiData {
  id: string;
  productId: string;
  price: {
    value: { centAmount: number };
  };
  quantity: number;
  totalPrice: { centAmount: number };
  discountedPricePerQuantity: string; // TODO check update type
}

export const getLineItem = (data: LineItemApiData): LineItem => {
  return {
    id: data.id,
    productId: data.productId,
    price: data.price.value.centAmount,
    totalPrice: data.totalPrice.centAmount,
    quantity: data.quantity,
    discountedPricePerQuantity: JSON.stringify(data.discountedPricePerQuantity),
  };
};

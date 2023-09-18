import { LineItem } from '../types/interfaces';

interface LineItemApiData {
  variant: { images: { url: string }[] };
  id: string;
  productId: string;
  price: {
    value: { centAmount: number };
  };
  quantity: number;
  totalPrice: { centAmount: number };
  name: { 'en-US': string };
}

export const getLineItem = (data: LineItemApiData): LineItem => {
  return {
    id: data.id,
    productId: data.productId,
    price: data.price.value.centAmount,
    totalPrice: data.totalPrice.centAmount,
    quantity: data.quantity,
    name: data.name['en-US'],
    imageUrl: data.variant.images[0].url,
  };
};

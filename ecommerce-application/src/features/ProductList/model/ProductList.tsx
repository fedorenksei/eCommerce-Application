import React from 'react';
import { ProductData } from '../../../shared/types/interfaces';

type Props = {
  products: ProductData[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className="flex flex-col">
      {products.map(({ name: { en: productName }, id }) => (
        <span key={id}>{JSON.stringify(productName)}</span>
      ))}
    </div>
  );
};

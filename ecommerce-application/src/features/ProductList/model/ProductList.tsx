import React from 'react';
import { ProductData } from '../../../shared/types/interfaces';

type Props = {
  products: ProductData[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className="flex flex-col">
      {products.map(
        ({
          name: { en: productName },
          masterVariant: { images, prices },
          metaDescription,
          id,
        }) => (
          <div
            className="flex flex-col border-2"
            key={id}
          >
            <span>{JSON.stringify(productName)}</span>
            {images.map((img) => (
              <span key={img.url}>{img.url}</span>
            ))}
            <span>
              Price is {Number(prices[0].value.centAmount) / 100} euro
            </span>
            <span>{metaDescription?.en}</span>
          </div>
        ),
      )}
    </div>
  );
};

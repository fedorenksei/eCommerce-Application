import React from 'react';
import { ProductData } from '../../../shared/types/interfaces';

type Props = {
  products: ProductData[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_300px))] justify-even">
      {products.map(
        ({
          name: { 'en-US': productName },
          masterVariant: { images, prices },
          description,
          id,
        }) => (
          <div
            className="flex flex-col border-2 p-2"
            key={id}
          >
            <span>{JSON.stringify(productName)}</span>
            {images.map((img) => (
              <span key={img.url}>{img.url}</span>
            ))}
            <span>
              Price is {Number(prices[0].value.centAmount) / 100} euro
            </span>
            <span>{description?.['en-US']}</span>
          </div>
        ),
      )}
    </div>
  );
};

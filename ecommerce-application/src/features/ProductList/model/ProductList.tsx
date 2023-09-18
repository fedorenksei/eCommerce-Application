import React from 'react';
import { ProductData } from '../../../shared/types/interfaces';
import { ProductCard } from './ProductCard';

type Props = {
  products: ProductData[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] justify-evenly gap-3">
      {products.map(
        ({
          name: { 'en-US': productName },
          masterVariant: { images, prices },
          description,
          id,
        }) => (
          <ProductCard
            key={id}
            id={id}
            productName={productName}
            price={Number(prices[0].value.centAmount) / 100}
            priceDiscount={
              (Number(prices[0].discounted?.value.centAmount) || 0) / 100
            }
            imageUrl={images[0].url}
            description={description?.['en-US']}
          />
        ),
      )}
    </div>
  );
};

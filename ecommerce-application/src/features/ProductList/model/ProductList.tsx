import React from 'react';
import { ProductData } from '../../../shared/types/interfaces';
import { ProductCard } from './ProductCard';

type Props = {
  products: ProductData[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_200px))] justify-evenly gap-3">
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
            imageUrl={images[0].url}
            description={description?.['en-US']}
          />
        ),
      )}
    </div>
  );
};

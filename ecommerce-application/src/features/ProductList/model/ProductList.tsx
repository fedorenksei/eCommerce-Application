import React from 'react';
import { ProductData } from '../../../shared/types/interfaces';
import { useNavigate } from 'react-router-dom';

type Props = {
  products: ProductData[];
};

export const ProductList = ({ products }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {products.map(
        ({
          name: { 'en-US': productName },
          masterVariant: { images, prices },
          description,
          id,
        }) => (
          <div
            className="flex flex-col border-2"
            key={id}
            role="presentation"
            onClick={() => navigate(`/product/${id}`)}
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

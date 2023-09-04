import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedProductData } from '../../../shared/types/interfaces';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header2 } from '../../../shared/ui/text/Header2';
import { Header3 } from '../../../shared/ui/text/Header3';
import { Paragraph } from '../../../shared/ui/text/Paragraph';

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<DetailedProductData | null>(null);

  const cbSetProduct = useCallback(
    (productData: DetailedProductData) => setProduct(productData),
    [],
  );
  const serverApi = ServerAPI.getInstance();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const fetchedProduct = await serverApi.getProduct(id);
      cbSetProduct(fetchedProduct);
    };

    fetchProduct();
  }, [cbSetProduct, id, serverApi]);

  const productName = product?.masterData.current.name['en-US'];
  const description = product?.masterData.current.description['en-US'];
  const imageUrls = product?.masterData.current.masterVariant.images || [];
  const price =
    Number(
      product?.masterData.current.masterVariant.prices[0].value.centAmount,
    ) / 100;
  const discountedPrice = Math.floor(price * 0.95);

  return (
    <div className="w-full space-y-4 p-10">
      <div className="text-center">
        <Header2>Product Info</Header2>
      </div>
      <div className="max-w-lg space-y-2 mx-auto">
        <Header3>{productName}</Header3>
        <div className="space-x-2">
          <span className="text-neutral-400 line-through">€{price}</span>
          <span className="text-danger-color">€{discountedPrice}</span>
        </div>
        <Paragraph>{description}</Paragraph>
      </div>

      {imageUrls.map(({ url }) => (
        <img
          src={url}
          alt={productName}
          key={url}
        />
      ))}
    </div>
  );
};

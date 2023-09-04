import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedProductData } from '../../../shared/types/interfaces';
import { ServerAPI } from '../../../shared/api/ServerAPI';

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

  return (
    <div className="flex flex-col">
      <span>
        <span className="font-bold">name:</span>{' '}
        {product?.masterData.current.name['en-US']}
      </span>
      <span>
        <span className="font-bold">id:</span> {product?.id}
      </span>
      <span>
        <span className="font-bold">description:</span>{' '}
        {product?.masterData.current.description['en-US']}
      </span>
      <span>
        <span className="font-bold">image links:</span>{' '}
        <div className="flex flex-col"></div>
        {product?.masterData.current.masterVariant.images.map(({ url }) => (
          <div key={url}>{url}</div>
        ))}
      </span>
      <span>
        <span className="font-bold">price:</span>{' '}
        {Number(
          product?.masterData.current.masterVariant.prices[0].value.centAmount,
        ) / 100}{' '}
        <span className="font-bold">euro</span>
      </span>
    </div>
  );
};

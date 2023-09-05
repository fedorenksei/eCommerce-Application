import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedProductData } from '../../../shared/types/interfaces';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header2 } from '../../../shared/ui/text/Header2';
import { Header3 } from '../../../shared/ui/text/Header3';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { getButtonStyles } from '../../../shared/ui/styles';
import clsx from 'clsx';

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
  const price =
    Number(
      product?.masterData.current.masterVariant.prices[0].value.centAmount,
    ) / 100;
  const discountedPrice = Math.floor(price * 0.95);

  const imageUrls = product?.masterData.current.masterVariant.images || [];
  const [currImg, setCurrImg] = useState(0);
  const currImgUrl = imageUrls[currImg]?.url;

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

      <div
        className={clsx(
          'max-w-[100%] gap-5 p-4',
          'flex justify-center items-center',
        )}
      >
        <button
          disabled={currImg === 0 ? true : false}
          onClick={() => {
            setCurrImg((c) => c - 1);
          }}
          className={clsx(
            getButtonStyles({
              size: 'small',
              filling: 'transparent',
              shape: 'round',
              disabled: currImg === 0 ? true : false,
            }),
          )}
        >
          &lt;&lt;
        </button>

        <button
          disabled={currImg >= imageUrls.length - 1 ? true : false}
          onClick={() => {
            setCurrImg((c) => c + 1);
          }}
          className={getButtonStyles({
            size: 'small',
            filling: 'transparent',
            shape: 'round',
            disabled: currImg >= imageUrls.length - 1 ? true : false,
          })}
        >
          &gt;&gt;
        </button>
      </div>

      <img
        src={currImgUrl}
        alt={productName}
        key={`${id}_image_${currImg}`}
        className="md:max-w-[80%] mx-auto"
      />
    </div>
  );
};

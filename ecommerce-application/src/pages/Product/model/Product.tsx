import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedProductData } from '../../../shared/types/interfaces';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header2 } from '../../../shared/ui/text/Header2';
import { Header3 } from '../../../shared/ui/text/Header3';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { getButtonStyles, getTextStyles } from '../../../shared/ui/styles';
import {
  AddCartAction,
  ChangeLineAction,
  DeleteItemAction,
} from '../../../shared/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import clsx from 'clsx';

import './slider.css';
import { useToggle } from '../../../shared/utils/hooks';
import {
  ButtonNext,
  ButtonPrevious,
} from '../../../shared/ui/buttons/PrevNext';

export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<DetailedProductData | null>(null);

  const cbSetProduct = useCallback(
    (productData: DetailedProductData) => setProduct(productData),
    [],
  );
  const serverApi = ServerAPI.getInstance();
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const fetchedProduct = await serverApi.getProduct(id);
      cbSetProduct(fetchedProduct);
    };

    fetchProduct();
  }, [cbSetProduct, id, serverApi]);

  const productSearch = lineItems.filter(
    (lineItem) => lineItem.productId === id,
  );
  const lineItemOfProduct = productSearch[0];
  let amount: number;
  let isCart: boolean = false;
  let cartButtonTitle: string = 'Add';

  if (lineItemOfProduct?.id === undefined) {
    isCart = false;
    amount = 0;
    cartButtonTitle = 'Add';
  } else {
    isCart = true;
    amount = lineItemOfProduct?.quantity;
    cartButtonTitle = 'Del';
  }

  const productName = product?.masterData.current.name['en-US'];
  const description = product?.masterData.current.description['en-US'];
  const price =
    Number(
      product?.masterData.current.masterVariant.prices[0].value.centAmount,
    ) / 100;
  const discountedPrice =
    Number(
      product?.masterData.current.masterVariant.prices[0].discounted?.value
        .centAmount,
    ) / 100;

  const imageUrls =
    product?.masterData.current.masterVariant.images.map(
      (image) => image.url,
    ) || [];
  const [currImg, setCurrImg] = useState(0);
  const [fullScreen, toggleFullScreen] = useToggle();

  return (
    <div className="w-full space-y-4 p-10">
      <div className="text-center">
        <Header2>Product Info</Header2>
      </div>
      <div className="max-w-lg space-y-2 mx-auto">
        <Header3>{productName}</Header3>
        <div className="space-x-2">
          {!isNaN(price) && (
            <span
              className={clsx(
                discountedPrice
                  ? 'text-neutral-400 line-through'
                  : 'text-text-color dark:text-dt-text-color',
              )}
            >
              €{price}
            </span>
          )}
          {discountedPrice > 0 && (
            <span className="text-danger-color">€{discountedPrice}</span>
          )}
        </div>
        <Paragraph>{description}</Paragraph>

        <div className="flex flex-wrap items-center gap-3">
          <button
            disabled={isCart ? false : true}
            onClick={() => {
              changeLineCart(amount - 1);
            }}
            className={clsx(
              getButtonStyles({
                size: 'small',
                filling: 'transparent',
                shape: 'round',
                disabled: isCart ? false : true,
              }),
            )}
          >
            -
          </button>
          <span className={getTextStyles({ font: 'h4' })}>{amount}</span>

          <button
            onClick={() => {
              addToCart(id, 1);
            }}
            className={clsx(
              getButtonStyles({
                size: 'small',
                filling: 'transparent',
                shape: 'round',
              }),
            )}
          >
            +
          </button>

          <button
            onClick={() => {
              updateCard(id);
            }}
            className={getButtonStyles({
              size: 'small',
              filling: 'transparent',
              shape: 'round',
            })}
          >
            {cartButtonTitle}
          </button>
        </div>

        <div
          className={clsx(
            'space-y-3 text-center pb-3',
            fullScreen &&
              'absolute top-0 left-0 shadow-[0px_0px_0px_100000px_rgba(0,_0,_0,_0.5)] z-10 bg-bg-color dark:bg-dt-bg-color',
          )}
        >
          <div
            className={clsx(
              'max-w-[100%] gap-2 p-4',
              'flex justify-center items-center',
            )}
          >
            <ButtonPrevious
              onClick={() => {
                setCurrImg((c) => c - 1);
              }}
              disabled={currImg === 0}
            />
            <ButtonNext
              onClick={() => {
                setCurrImg((c) => c + 1);
              }}
              disabled={currImg >= imageUrls.length - 1}
            />
          </div>
          <div
            className="overflow-hidden"
            role="presentation"
            onClick={toggleFullScreen}
          >
            <div
              className="w-[100%] cursor-pointer flex transition-all my-slider-translate"
              style={{ '--slide-number': currImg } as React.CSSProperties}
            >
              {imageUrls.map((url, i) => (
                <img
                  src={url}
                  alt={productName}
                  key={`${id}_image_${i}`}
                  className="w-[100%] shrink-0 mx-auto"
                />
              ))}
            </div>
          </div>
          <Paragraph>
            Click on the image to {fullScreen ? 'go back' : 'see it full-scale'}
          </Paragraph>
        </div>
      </div>
    </div>
  );

  async function addToCart(idProduct: string | undefined, amount: number = 1) {
    const res = await serverApi.updateCart(getUpdateActions(idProduct, amount));
    console.log(res);
  }

  // add to cart
  function getUpdateActions(id: string | undefined, amount: number = 1) {
    const actions: AddCartAction[] = [
      {
        action: 'addLineItem',
        productId: id,
        variantId: 1,
        quantity: amount,
      },
    ];
    return actions;
  }

  async function delInCart() {
    if (lineItemOfProduct?.id) {
      await serverApi.updateCart(deleteActions(lineItemOfProduct?.id));
      return;
    }
  }

  async function changeLineCart(amount: number) {
    if (lineItemOfProduct?.id) {
      await serverApi.updateCart(
        changeLineActions(lineItemOfProduct?.id, amount),
      );
      return;
    }
  }

  function deleteActions(ItemId: string) {
    const actions: DeleteItemAction[] = [
      {
        action: 'removeLineItem',
        lineItemId: ItemId,
      },
    ];
    return actions;
  }

  function changeLineActions(ItemId: string, amount: number) {
    const actions: ChangeLineAction[] = [
      {
        action: 'changeLineItemQuantity',
        lineItemId: ItemId,
        quantity: amount,
      },
    ];
    return actions;
  }

  async function updateCard(id: string | undefined) {
    if (isCart) {
      delInCart();
    } else {
      addToCart(id);
    }
    return;
  }
};

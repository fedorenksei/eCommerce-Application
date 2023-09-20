import React from 'react';
import { LineItem } from '../../../shared/types/interfaces';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { getTextStyles } from '../../../shared/ui/styles';
import { Link } from 'react-router-dom';
import {
  AddCartAction,
  ChangeLineAction,
  DeleteItemAction,
} from '../../../shared/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import clsx from 'clsx';
import { BsPlusCircle, BsDashCircle, BsTrash } from 'react-icons/bs';

export const ItemCarts = () => {
  const serverApi = ServerAPI.getInstance();
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);

  return (
    <div className="grid gap-10 md:gap-5">
      {lineItems.map((item: LineItem) => (
        <div
          key={item.id}
          className="flex items-start gap-2 md:gap-5 lg:gap-10 md:border rounded-md md:p-4"
        >
          <Link
            to={`/product/${item.productId}`}
            className="shrink-0"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-24 md:w-36 lg:w-48 aspect-square"
            />
          </Link>

          <div className="flex-grow space-y-3">
            <Link to={`/product/${item.productId}`}>
              <h5 className={getTextStyles({ font: 'h5', link: true })}>
                {item.name}
              </h5>
            </Link>
            <div className="flex gap-2 justify-between">
              <div className="text-left">
                <span
                  className={
                    item.productDiscountedPrice
                      ? 'text-neutral-400 line-through'
                      : getTextStyles({})
                  }
                >
                  €{item.price / 100}
                </span>
                {item.productDiscountedPrice && (
                  <span className="text-danger-color">
                    {' '}
                    €{item.productDiscountedPrice / 100}
                  </span>
                )}
              </div>

              <div className="text-right">
                <span
                  className={
                    item.promoDiscountedPrice
                      ? 'text-neutral-400 line-through'
                      : getTextStyles({})
                  }
                >
                  €
                  {(item.promoDiscountedPrice
                    ? item.price * item.quantity
                    : item.totalPrice) / 100}
                </span>

                {item.promoDiscountedPrice && (
                  <span className="text-danger-color">
                    {' '}
                    €{(item.promoDiscountedPrice * item.quantity) / 100}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-start gap-2">
                <button
                  onClick={() => {
                    changeLineCart(item.id, item.quantity - 1);
                  }}
                  className={
                    (clsx(getTextStyles({})),
                    'text-hover-color hover:text-primary-color')
                  }
                >
                  <BsDashCircle
                    size="1.5rem"
                    title="Remove one from cart"
                  />
                </button>

                <Paragraph>x{item.quantity}</Paragraph>

                <button
                  onClick={() => {
                    addToCart(item.productId, 1);
                  }}
                  className={
                    (clsx(getTextStyles({})),
                    'text-hover-color hover:text-primary-color')
                  }
                >
                  <BsPlusCircle
                    size="1.5rem"
                    title="Add one to cart"
                  />
                </button>
              </div>

              <button
                onClick={() => {
                  delInCart(item.id);
                }}
                className={
                  (clsx(getTextStyles({})),
                  'text-danger-hover-color hover:text-danger-color')
                }
              >
                <BsTrash
                  size="1.5rem"
                  title="Delete from cart"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
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

  async function delInCart(itemId: string) {
    const res = await serverApi.updateCart(deleteActions(itemId));
    console.log(res);
    return;
  }

  async function changeLineCart(itemId: string, amount: number) {
    const res = await serverApi.updateCart(changeLineActions(itemId, amount));
    console.log(res);
    return;
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
};

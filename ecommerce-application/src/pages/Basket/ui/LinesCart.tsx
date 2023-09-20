import React from 'react';
import { LineItem } from '../../../shared/types/interfaces';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header5 } from '../../../shared/ui/text/Header5';
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
import { BsCartPlus, BsCartDash, BsTrash } from 'react-icons/bs';

export const ItemCarts = () => {
  const serverApi = ServerAPI.getInstance();
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);

  return (
    <div className="grid grid-cols-[repeat(4,_auto)] md:grid-cols-[repeat(8,_auto)] justify-evenly place-items-center gap-3">
      {lineItems.map((item: LineItem) => (
        <React.Fragment key={item.id}>
          <Link to={`/product/${item.productId}`}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-12 aspect-square min-w-[3rem]"
            />
          </Link>

          <Header5>{item.name}</Header5>

          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => {
                changeLineCart(item.id, item.quantity - 1);
              }}
              className={
                (clsx(getTextStyles({})),
                'text-hover-color hover:text-primary-color')
              }
            >
              <BsCartDash
                size="1.5rem"
                title="Remove one from cart"
              />
            </button>
            <button
              onClick={() => {
                addToCart(item.productId, 1);
              }}
              className={
                (clsx(getTextStyles({})),
                'text-hover-color hover:text-primary-color')
              }
            >
              <BsCartPlus
                size="1.5rem"
                title="Add one to cart"
              />
            </button>
            <button
              onClick={() => {
                delInCart(item.id);
              }}
              className={
                (clsx(getTextStyles({})),
                'text-hover-color hover:text-primary-color')
              }
            >
              <BsTrash
                size="1.5rem"
                title="Delete from cart"
              />
            </button>
          </div>

          <span
            className={
              item.productDiscountedPrice
                ? 'text-neutral-400 line-through'
                : getTextStyles({})
            }
          >
            €{item.price / 100}
          </span>
          <span className="text-danger-color">
            {item.productDiscountedPrice &&
              `€${item.productDiscountedPrice / 100}`}
          </span>

          <Paragraph>x{item.quantity}</Paragraph>

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

          <span className="text-danger-color">
            {item.promoDiscountedPrice &&
              `€${(item.promoDiscountedPrice * item.quantity) / 100}`}
          </span>
        </React.Fragment>
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

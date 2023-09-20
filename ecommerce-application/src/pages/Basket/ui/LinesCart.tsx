import React from 'react';
import { LineItem } from '../../../shared/types/interfaces';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header5 } from '../../../shared/ui/text/Header5';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { getButtonStyles } from '../../../shared/ui/styles';
import { Link } from 'react-router-dom';
import {
  AddCartAction,
  ChangeLineAction,
  DeleteItemAction,
} from '../../../shared/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import clsx from 'clsx';

export const ItemCarts = () => {
  const serverApi = ServerAPI.getInstance();
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_300px))] justify-evenly gap-3">
      {lineItems.map((item: LineItem) => (
        <div key={item.id}>
          <Link to={`/product/${item.productId}`}>
            <img
              src={item.imageUrl}
              alt={item.name}
            />
          </Link>
          <Header5>{item.name}</Header5>
          <Paragraph>Quantity: {item.quantity}</Paragraph>
          <div
            className={clsx(
              'max-w-[100%] gap-2 p-4',
              'flex justify-center items-center',
            )}
          >
            <button
              onClick={() => {
                changeLineCart(item.id, item.quantity - 1);
              }}
              className={clsx(
                getButtonStyles({
                  size: 'small',
                  filling: 'transparent',
                  shape: 'round',
                }),
              )}
            >
              -
            </button>
            <button
              onClick={() => {
                addToCart(item.productId, 1);
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
                delInCart(item.id);
              }}
              className={getButtonStyles({
                size: 'small',
                filling: 'transparent',
                shape: 'round',
              })}
            >
              Delete
            </button>
          </div>
          <div className="space-x-2">
            <span className="text-neutral-400 line-through">
              Price: €{item.price / 100}
            </span>
            <span className="text-danger-color">
              Total price: €{item.totalPrice / 100}
            </span>
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

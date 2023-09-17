import React from 'react';
import { LineItem } from '../../../shared/types/interfaces';
//import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header5 } from '../../../shared/ui/text/Header5';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
//import { getButtonStyles } from '../../../shared/ui/styles';
//import { AddCartAction, DeleteItemAction } from '../../../shared/types/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
//import clsx from 'clsx';

export const ItemCarts = () => {
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);
  console.log('cartId:', 'productID:', 'lineItems', lineItems);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_300px))] justify-evenly gap-3">
      {lineItems.map((item: LineItem) => (
        <div key={item.id}>
          <img
            src={item.imageUrl}
            alt={item.name}
          />
          <Header5>{item.name}</Header5>
          <Paragraph>Quantity: {item.quantity}</Paragraph>
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
};

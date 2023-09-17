import React from 'react';
import { Header2 } from '../../../shared/ui/text/Header2';
import { Header5 } from '../../../shared/ui/text/Header5';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { ApplyCode } from './ApplyCode';
import { ItemCarts } from './LinesCart';

export const Basket = () => {
  //const cart = useSelector((state: RootState) => state.cart);
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);
  if (lineItems.length == 0) {
    return (
      <div className="p-10 space-y-3 text-center">
        <Header2>Your cart</Header2>
        <ApplyCode />
        <div>
          <Header5>Cart is empty</Header5>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-10 space-y-3 text-center">
        <Header2>Your cart</Header2>
        <ApplyCode />
        <div>
          <Header5>select:</Header5>
        </div>
        <ItemCarts />
      </div>
    );
  }
};

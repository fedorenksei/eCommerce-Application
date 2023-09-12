import React from 'react';
import { Header2 } from '../../../shared/ui/text/Header2';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { ApplyCode } from './ApplyCode';

export const Basket = () => {
  const cart = useSelector((state: RootState) => state.cart);

  return (
    <div className="p-10 space-y-3 text-center">
      <Header2>Your cart</Header2>
      <ApplyCode />
      {JSON.stringify(cart)}
    </div>
  );
};
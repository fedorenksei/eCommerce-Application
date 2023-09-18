import React from 'react';
import { Header2 } from '../../../shared/ui/text/Header2';
import { Header5 } from '../../../shared/ui/text/Header5';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { DiscountCode } from './DiscountCode';
import { ItemCarts } from './LinesCart';
import { Link } from 'react-router-dom';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { getButtonStyles } from '../../../shared/ui/styles';
import clsx from 'clsx';

export const Basket = () => {
  const cart = useSelector((state: RootState) => state.cart);
  console.log('Summa:', cart.totalPrice, 'items:', cart.totalLineItemQuantity);
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);
  if (lineItems.length == 0) {
    return (
      <div className="p-10 space-y-3 text-center">
        <Header2>Your cart</Header2>
        <div>
          <Header5>Cart is empty</Header5>
          <Paragraph>Welcome to Shopping</Paragraph>
          <Link to={`/catalog`}>
            <button
              type="button"
              className={getButtonStyles({
                size: 'medium',
                filling: 'filled',
                shape: 'round',
              })}
            >
              Catalog
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-10 space-y-3 text-center">
        <Header2>Your cart</Header2>

        <DiscountCode discountCodeId={cart.discountCodeId} />
        <div
          className={clsx(
            'max-w-[100%] gap-4 p-4',
            'flex justify-center items-center',
          )}
        >
          <Header2>
            Products: {cart.totalLineItemQuantity} Total: €
            {cart.totalPrice / 100}
          </Header2>
        </div>
        <div>
          <ItemCarts />
        </div>
      </div>
    );
  }
};

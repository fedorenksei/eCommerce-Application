import React, { useState } from 'react';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { Header2 } from '../../../shared/ui/text/Header2';
import { Header5 } from '../../../shared/ui/text/Header5';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { DiscountCode } from './DiscountCode';
import { ItemCarts } from './LinesCart';
import { Link } from 'react-router-dom';
import { getButtonStyles } from '../../../shared/ui/styles';
import clsx from 'clsx';
import { setIsShown, setText } from '../../../shared/store/modalSlice';
import { useDispatch } from 'react-redux';

export const Basket = () => {
  const serverApi = ServerAPI.getInstance();
  const cart = useSelector((state: RootState) => state.cart);
  const lineItems = useSelector((state: RootState) => state.cart.lineItems);
  const dispatch = useDispatch();
  const [isModalShown, setIsModalShown] = useState(false);

  async function delCart() {
    const isOk = await serverApi.deleteCart();
    dispatch(setIsShown({ isShown: true }));
    if (isOk) {
      dispatch(
        setText({
          text: 'You have cleared your cart',
        }),
      );
    } else {
      dispatch(
        setText({
          text: 'Something went wrong. You have not cleared your cart',
        }),
      );
    }
  }

  if (lineItems.length == 0) {
    return (
      <div className="p-10 space-y-3 text-center flex justify-items-center justify-center">
        <div>
          <Header2>Your cart</Header2>
          <div>
            <Header5>Cart is empty</Header5>
            <div>
              <img
                src="./images/Empty.png"
                alt="empty bike"
              />
            </div>
            <Header5>Welcome to Shopping</Header5>
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

        <ItemCarts />

        <button
          onClick={() => {
            /* delCart(); */
            setIsModalShown(true);
          }}
          type="button"
          className={getButtonStyles({
            size: 'small',
            filling: 'transparent',
            shape: 'round',
            color: 'danger',
          })}
        >
          Clear Shopping Cart
        </button>
        {isModalShown && (
          <div className="flex gap-3 flex-wrap w-full h-full top-0 left-0 justify-center items-center fixed bg-gray-900 opacity-90 text-white text-xl">
            <span className="basis-full">
              The cart will be clear! Are you sure?
            </span>
            <button
              onClick={() => {
                setIsModalShown(false);
              }}
              className="p-2 bg-slate-100 text-black"
            >
              Please no!!!
            </button>
            <button
              onClick={() => {
                delCart();
                setIsModalShown(false);
              }}
              className="p-2 bg-slate-100 text-black"
            >
              Do it baby!
            </button>
          </div>
        )}
      </div>
    );
  }
};

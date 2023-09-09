import React, { useEffect, useState } from 'react';
import { Header2 } from '../../../shared/ui/text/Header2';
import { ServerAPI } from '../../../shared/api/ServerAPI';

export const Basket = () => {
  const serverApi = ServerAPI.getInstance();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState('');

  useEffect(() => {
    (async () => {
      const cart = await serverApi.getCart();
      setCart(cart);
      setIsLoading(false);
    })();
  }, [serverApi]);

  return (
    <div className="p-10 space-y-3 text-center">
      <Header2>Your cart</Header2>
      {isLoading ? 'Loading...' : JSON.stringify(cart)}
    </div>
  );
};

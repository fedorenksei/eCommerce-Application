/* function App() {
  return null;
}

export default App
 */

import React, { FC } from 'react';
import styles from './Cart.module.scss';

interface CardProps {
  isInBasket?: boolean;
}

export const App: FC<CardProps> = (props) => {
  const a = 'asd';

  console.log(a);
  return (
    <div className={`${styles.cart} ${props.isInBasket ? styles['cart_in-basket'] : ''}`}>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, quis.</p>
      <img src="./asd.jpg" />
      <h4>Name</h4>
      {props.isInBasket ? <span>Alredy in Cart</span> : <button>Add to Cart</button>}
    </div>
  );
};

export default App;

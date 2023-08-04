/* function App() {
  return null;
}

export default App
 */

import React, { FC } from "react";
import styles from "./Cart.module.scss";

interface CardProps {
  isInBasket?: boolean,
}

export const App: FC<CardProps> = ({isInBasket}) => {
  return (
    <div className={`${styles.cart} ${isInBasket ? styles['cart_in-basket'] : ''}`}>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, quis.</p>
      <h4>Name</h4>
      {(isInBasket ?
        <span>Alredy in Cart</span>
        :
        <button>Add to Cart</button>
        )}
    </div>
  )
}

export default App
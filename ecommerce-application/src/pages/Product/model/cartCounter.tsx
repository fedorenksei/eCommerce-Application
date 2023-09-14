import React, { useState, FC } from 'react';

interface CartCounterProps {
  countStart: number;
}

export const Counter: FC<CartCounterProps> = ({ countStart }) => {
  const [counter, setCounter] = useState(countStart);
  const countIncrement = () => {
    if (counter < 99) {
      setCounter(counter + 1);
    }
  };

  const countDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };
  console.log(counter);

  return (
    // TODO add component and styles
    <div className="counter">
      <p>{counter}</p>
      <button onClick={countIncrement}>+</button>
      <button onClick={countDecrement}>-</button>
    </div>
  );
};

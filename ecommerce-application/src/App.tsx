import React, { FC } from 'react';

interface CardProps {
  isInBasket?: boolean;
}

export const App: FC<CardProps> = ({ isInBasket }) => {
  return (
    <>
      <div className="flex justify-between items-center m-8">
        <div>
          <h3>Light</h3>
          <div className="w-52 border-slate-800 border-2 h-10 bg-card-color">card-bg-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-primary-color">primary-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-secondary-color">secondary-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-accent-color">accent-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-hover-color">hover-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-disable-color">disable-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-success-color">success-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-alert-color">alert-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-danger-color">danger-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-fade-text-color">fade-text-color</div>
        </div>
        <div>
          <h3>Dark</h3>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-card-color">card-bg-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-primary-color">primary-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-secondary-color">secondary-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-accent-color">accent-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-hover-color">hover-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-disable-color">disable-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-success-color">success-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-alert-color">alert-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-danger-color">danger-color</div>
          <div className="w-52 border-slate-800 border-2 h-10 bg-dt-fade-text-color">fade-text-color</div>
        </div>
        <div className="w-60 h-96 flex flex-col items-center justify-around rounded-xl bg-card-color dark:bg-dt-bg-color">
          <p className="text-xl text-center text-primary-color">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, quis.
          </p>
          <h4 className="text-3xl font-bold text-primary-color">Name</h4>
          {isInBasket ? (
            <span>Alredy in Cart</span>
          ) : (
            <button className="p-2 rounded-xl bg-primary-color text-secondary-color">Add to Cart</button>
          )}
        </div>
      </div>
    </>
  );
};

export default App;

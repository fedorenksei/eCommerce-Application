import React from 'react';
import { Link } from 'react-router-dom';
import { getButtonStyles } from '../../shared/ui/styles';
import { Header2 } from '../../shared/ui/text/Header2';
import { Header5 } from '../../shared/ui/text/Header5';

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-[80vh] p-10 gap-3">
      <Header2>Not found</Header2>
      <Header5>Oops! You are lost.</Header5>
      {/* <h4 className="text-primary-color text-2xl font-semibold font-primary"></h4> */}
      <div className="p-10">
        <img
          src="/public/images/not-found.png"
          alt="bottle in the water"
        />
      </div>
      <Link to="/">
        <button
          className={getButtonStyles({
            size: 'large',
            color: 'filled',
            shape: 'round',
          })}
        >
          Go home
        </button>
      </Link>
    </div>
  );
};

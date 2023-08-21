import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { Link } from 'react-router-dom';
import { getButtonStyles } from '../../shared/ui/styles';

export const Main = () => {
  return (
    <div className="text-center text-4xl p-10">
      <Header2>Main page</Header2>
      <div className="p-10 flex flex-wrap gap-5 justify-center">
        <Link to="/login">
          <button
            type="button"
            className={getButtonStyles({
              size: 'medium',
              color: 'filled',
              shape: 'round',
            })}
          >
            Login
          </button>
        </Link>
        <Link to="/registration">
          <button
            type="button"
            className={getButtonStyles({
              size: 'medium',
              color: 'filled',
              shape: 'round',
            })}
          >
            Registration
          </button>
        </Link>
      </div>
    </div>
  );
};

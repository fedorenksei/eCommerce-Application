import React from 'react';
import { Link } from 'react-router-dom';
import { getButtonStyles } from '../../shared/ui/styles';
import { Header2 } from '../../shared/ui/text/Header2';
import { Header5 } from '../../shared/ui/text/Header5';

export const Catalog = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-[80vh] p-10 gap-3 text-center">
      <Header2>Coming soon :&#41;</Header2>
      <Header5>Catalog page</Header5>
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

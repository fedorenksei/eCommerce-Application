import React from 'react';
import { TextComponentProps } from '../../types/interfaces';
import clsx from 'clsx';

export const Header6 = ({ children }: TextComponentProps) => {
  return (
    <h6
      className={clsx(
        'text-base font-bold',
        'text-text-color dark:text-dt-text-color',
      )}
    >
      {children}
    </h6>
  );
};

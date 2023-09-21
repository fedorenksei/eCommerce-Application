import React from 'react';
import { PropsWithChildren } from 'react';
import { getTextStyles } from '../../styles';

export const Header4 = ({ children }: PropsWithChildren) => {
  return (
    <h4 className={getTextStyles({ font: 'h4' })}>
      {/* linebreak */}
      {children}
    </h4>
  );
};

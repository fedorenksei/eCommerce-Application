import React from 'react';
import { PropsWithChildren } from 'react';
import { getTextStyles } from '../../styles';

export const Header5 = ({ children }: PropsWithChildren) => {
  return (
    <h5 className={getTextStyles({ font: 'h5' })}>
      {/* linebreak */}
      {children}
    </h5>
  );
};

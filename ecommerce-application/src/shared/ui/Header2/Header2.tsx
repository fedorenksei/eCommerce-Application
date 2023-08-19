import { PropsWithChildren } from 'react';
import { getTextStyles } from '../styles';

export const Header2 = ({ children }: PropsWithChildren) => {
  return (
    <h5 className={getTextStyles({ font: 'h2' })}>
      {/* linebreak */}
      {children}
    </h5>
  );
};

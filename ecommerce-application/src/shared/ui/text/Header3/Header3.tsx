import { PropsWithChildren } from 'react';
import { getTextStyles } from '../../styles';

export const Header3 = ({ children }: PropsWithChildren) => {
  return (
    <h3 className={getTextStyles({ font: 'h3' })}>
      {/* linebreak */}
      {children}
    </h3>
  );
};

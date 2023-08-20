import { PropsWithChildren } from 'react';
import { getTextStyles } from '../../styles';

export const Paragraph = ({ children }: PropsWithChildren) => {
  return (
    <p className={getTextStyles({})}>
      {/* linebreak */}
      {children}
    </p>
  );
};

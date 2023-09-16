import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';
import { getTextStyles } from '../../../shared/ui/styles';

export const NavListItem = ({ children }: PropsWithChildren) => {
  return (
    <li
      className={clsx(
        getTextStyles({}),
        'transition hover:text-primary-color hover:underline',
      )}
    >
      {children}
    </li>
  );
};

import React, { PropsWithChildren } from 'react';
import { getTextStyles } from '../../../shared/ui/styles';

export const NavListItem = ({ children }: PropsWithChildren) => {
  return <li className={getTextStyles({ link: true })}>{children}</li>;
};

import React from 'react';

type Props = React.ComponentPropsWithoutRef<'p'>;

/**
 * Wrap content into this component to apply styles of 6th header.
 */
export const Header6 = ({ children }: Props) => {
  return (
    <h6 className="text-slate-800 text-sm font-bold leading-normal tracking-tight">
      {children}
    </h6>
  );
};

import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { Products } from '../../widgets/Products';

export const Catalog = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Header2>Catalog</Header2>
      <Products />
    </div>
  );
};

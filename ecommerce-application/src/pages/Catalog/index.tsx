import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { Products } from '../../widgets/Products';

export const Catalog = () => {
  return (
    <div className="p-3 flex flex-col gap-2 items-stretch">
      <Header2>Catalog</Header2>
      <Products />
    </div>
  );
};

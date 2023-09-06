import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { Products } from '../../widgets/Products';

export const Catalog = () => {
  return (
    <div className="p-3 space-y-3">
      <div className="text-center">
        <Header2>Catalog</Header2>
      </div>
      <Products />
    </div>
  );
};

import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { Products } from '../../widgets/Products';
import { Categories } from '../../features/Categories';

export const Catalog = () => {
  return (
    <div className="flex flex-col items-center">
      <Header2>Catalog</Header2>
      <Categories />
      <Products />
    </div>
  );
};

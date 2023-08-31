import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { Products } from '../../widgets/Products';
import { Categories } from '../../features/Categories';
import { ProductFilter } from '../../features/ProductFilters';
import { ProductSearch } from '../../features/ProductSearch';
import { ProductSort } from '../../features/ProductSort';

export const Catalog = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Header2>Catalog</Header2>
      <Categories />
      <ProductFilter />
      <ProductSearch />
      <ProductSort />
      <Products />
    </div>
  );
};

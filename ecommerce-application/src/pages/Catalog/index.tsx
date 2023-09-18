import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { Products } from '../../widgets/Products';
import { CatalogSearch } from '../../entities/CatalogSearch';

export const Catalog = () => {
  return (
    <div className="p-3 pt-10 space-y-3 max-w-7xl mx-auto">
      <div className="flex gap-2 flex-wrap justify-between">
        <Header2>Bicycles</Header2>
        <div className="ml-auto">
          <CatalogSearch />
        </div>
      </div>
      <Products />
    </div>
  );
};

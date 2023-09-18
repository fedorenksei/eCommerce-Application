import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Filter } from '../../../entities/Filter';
import { VariantsParams } from '../../../shared/types/interfaces';
import { RangeFilter } from '../../../entities/RangeFilter';
import { CatalogSortPanel } from '../../../entities/CatalogSortPanel';

export const ProductFilters = () => {
  const filters = useSelector(
    (state: RootState) => state.filtersParams.variantParams,
  );
  const priceFilter = useSelector(
    (state: RootState) => state.filtersParams.priceParams,
  );
  const filterNames = Object.keys(filters).filter((item) => item !== 'prices');

  return (
    <div className="p-2 space-y-4 border rounded-md border-slate-300 md:max-w-sm">
      {filterNames.map((filterNameKey) => {
        if (filters[filterNameKey as keyof VariantsParams])
          return (
            <Filter
              filterState={filters[filterNameKey as keyof VariantsParams]}
              filterName={filterNameKey}
              key={filterNameKey}
            />
          );
      })}
      <RangeFilter
        filterParams={priceFilter}
        filterName="prices"
      />
      <CatalogSortPanel />
    </div>
  );
};

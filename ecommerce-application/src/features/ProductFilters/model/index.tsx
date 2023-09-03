import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Filter } from '../../../entities/Filter';
import { VariantsParams } from '../../../shared/types/interfaces';
import { RangeFilter } from '../../../entities/RangeFilter';

export const ProductFilter = () => {
  const filters = useSelector(
    (state: RootState) => state.filtersParams.variantParams,
  );
  const priceFilter = useSelector(
    (state: RootState) => state.filtersParams.priceParams,
  );
  console.log(priceFilter);
  const filterNames = Object.keys(filters).filter((item) => item !== 'prices');

  return (
    <div className="border-2 border-slate-800 w-full text-center">
      {filterNames.map((item) => {
        if (filters[item as keyof VariantsParams])
          return (
            <Filter
              filterState={filters[item as keyof VariantsParams]}
              filterName={item}
              key={item}
            />
          );
      })}
      <RangeFilter
        filterParams={priceFilter}
        filterName="prices"
      />
    </div>
  );
};

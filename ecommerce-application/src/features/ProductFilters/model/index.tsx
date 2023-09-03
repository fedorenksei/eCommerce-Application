import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export const ProductFilter = () => {
  const filtersParams = useSelector(
    (state: RootState) => state.filtersParams.params,
  );

  return (
    <div className="border-2 border-slate-800 w-full text-center">
      <div>
        <h3>Size</h3>
        <div>
          {filtersParams.sizes.map((item, index) => (
            <span key={item + index}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

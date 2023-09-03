import React, { useEffect, useState } from 'react';
import { PriceParams } from '../../../shared/types/interfaces';
import { useSearchParams } from 'react-router-dom';

type Props = {
  filterParams: PriceParams;
  filterName: string;
};

export const RangeFilter = ({
  filterParams: { max, min },
  filterName,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    setMaxValue(() => max);
    setMinValue(() => min);
  }, [max, min]);

  const onMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curVal = e.target!.value;
    setMinValue(() => +curVal);
  };

  const onMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curVal = e.target!.value;
    setMaxValue(() => +curVal);
  };

  const onApplyParamsClick = () => {
    if (min !== minValue || max !== maxValue) {
      searchParams.set('minPrice', String(minValue));
      searchParams.set('maxPrice', String(maxValue));
    } else {
      searchParams.delete('minPrice');
      searchParams.delete('maxPrice');
    }
    setSearchParams(searchParams);
  };

  const onResetClick = () => {
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col">
      <span>{filterName}</span>
      <label>
        <span>Min value</span>
        <input
          className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          type="range"
          min={min}
          max={maxValue}
          value={minValue}
          onChange={onMinInputChange}
        />
        <span>{minValue}</span>
      </label>
      <label>
        <span>Max value</span>
        <input
          className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          type="range"
          min={minValue}
          max={max}
          value={maxValue}
          onInput={onMaxInputChange}
        />
        <span>{maxValue}</span>
      </label>
      <div>
        <button onClick={onApplyParamsClick}>Apply</button>
        <button onClick={onResetClick}>Reset</button>
      </div>
    </div>
  );
};

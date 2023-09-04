import React, { useEffect, useState } from 'react';
import { PriceParams } from '../../../shared/types/interfaces';
import { useSearchParams } from 'react-router-dom';
import { Header3 } from '../../../shared/ui/text/Header3';
import { capitalize } from '../../../shared/utils/helpers';
import { Header5 } from '../../../shared/ui/text/Header5';
import { getButtonStyles } from '../../../shared/ui/styles';

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
    <div className="space-y-2">
      <Header3>{capitalize(filterName)}</Header3>
      <label>
        <Header5>Min value</Header5>
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
        <Header5>Max value</Header5>
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
      <div className="space-x-2">
        <button
          className={getButtonStyles({
            size: 'small',
            filling: 'filled',
            shape: 'round',
          })}
          onClick={onApplyParamsClick}
        >
          Apply
        </button>
        <button
          className={getButtonStyles({
            size: 'small',
            filling: 'transparent',
            shape: 'round',
          })}
          onClick={onResetClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

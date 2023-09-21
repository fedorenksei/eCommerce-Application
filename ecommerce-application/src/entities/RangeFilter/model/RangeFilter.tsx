import React, { useEffect, useState } from 'react';
import { PriceParams } from '../../../shared/types/interfaces';
import { useSearchParams } from 'react-router-dom';
import { Header3 } from '../../../shared/ui/text/Header3';
import { capitalize, roundNumber } from '../../../shared/utils/helpers';
import { getButtonStyles, getTextStyles } from '../../../shared/ui/styles';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import './range-input.css';

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
    if (Number(curVal) < maxValue - 10000) {
      setMinValue(() => +curVal);
    }
  };

  const onMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curVal = e.target!.value;
    if (Number(curVal) > minValue + 10000) {
      setMaxValue(() => +curVal);
    }
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
      <div className="relative h-6">
        <input
          id="min-price-range"
          className="my-range-input-class absolute top-1/2 left-0 w-full h-2 -mt-1"
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={onMinInputChange}
        />
        <input
          id="max-price-range"
          className="my-range-input-class absolute top-1/2 left-0 w-full h-2 -mt-1"
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onInput={onMaxInputChange}
        />
      </div>

      <div className="flex justify-between">
        <label
          htmlFor="min-price-range"
          className="flex flex-wrap items-center gap-1"
        >
          <Paragraph>from</Paragraph>
          <span className={getTextStyles({})}>€ {roundNumber(minValue)}</span>
        </label>
        <label
          htmlFor="max-price-range"
          className="flex flex-wrap items-center gap-1"
        >
          <Paragraph>to</Paragraph>
          <span className={getTextStyles({})}>€ {roundNumber(maxValue)}</span>
        </label>
      </div>

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

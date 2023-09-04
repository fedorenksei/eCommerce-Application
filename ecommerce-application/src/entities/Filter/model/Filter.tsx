import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getButtonStyles } from '../../../shared/ui/styles';
import clsx from 'clsx';
import { Header3 } from '../../../shared/ui/text/Header3';
import { capitalize } from '../../../shared/utils/helpers';

type Props = {
  filterState: string[];
  filterName: string;
};

export const Filter = ({ filterState, filterName }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [choosenParams, setChoosenParams] = useState<string[]>([]);

  const onParamClick = (param: string) => {
    setChoosenParams((curr) => {
      if (curr.includes(param)) {
        return curr.filter((item) => item !== param);
      } else {
        return [...curr, param];
      }
    });
  };

  const onApplyParamsClick = () => {
    const params = choosenParams.map((item) => `"${item}"`).join(',');
    params.length
      ? searchParams.set(filterName, params)
      : searchParams.delete(filterName);
    setSearchParams(searchParams);
  };

  const onResetClick = () => {
    searchParams.delete(filterName);
    setChoosenParams(() => []);
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-3">
      <Header3>{capitalize(filterName)}</Header3>
      <div className="flex flex-wrap gap-2">
        {filterState.map((item, index) => (
          <button
            key={item + index}
            onClick={() => onParamClick(item)}
            className={clsx(
              getButtonStyles({
                size: 'small',
                filling: 'transparent',
                shape: 'square',
              }),
              `${choosenParams.includes(item) ? 'bg-blue-400' : ''}`,
            )}
          >
            {item}
          </button>
        ))}
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

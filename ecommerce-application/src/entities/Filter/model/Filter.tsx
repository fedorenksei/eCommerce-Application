import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
  filterState: string[];
  filterName: string;
};

export const Filter = ({ filterState, filterName }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [choosenParams, setChoosenParams] = useState<string[]>([]);

  const onParamClick = (size: string) => {
    setChoosenParams((curr) => {
      if (curr.includes(size)) {
        return curr.filter((item) => item !== size);
      } else {
        return [...curr, size];
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
  return (
    <div>
      <h3>{filterName}</h3>
      <div>
        {filterState.map((item, index) => (
          <button
            key={item + index}
            onClick={() => onParamClick(item)}
            className={`border-2 ${
              choosenParams.includes(item) ? 'bg-blue-400' : ''
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <button onClick={onApplyParamsClick}>Apply</button>
    </div>
  );
};

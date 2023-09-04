import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getButtonStyles, getInputStyles } from '../../../shared/ui/styles';

export const CatalogSearch = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };
  const onSearchClick = () => {
    if (inputValue === '') {
      searchParams.delete('searchText');
    } else {
      searchParams.set('searchText', inputValue);
    }
    setSearchParams(searchParams);
  };
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Type for search"
        value={inputValue}
        onChange={onInputChange}
        className={getInputStyles({})}
      />
      <button
        type="button"
        onClick={onSearchClick}
        className={getButtonStyles({
          size: 'small',
          filling: 'filled',
          shape: 'round',
        })}
      >
        Search
      </button>
    </div>
  );
};

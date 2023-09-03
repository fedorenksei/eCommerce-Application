import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    <div>
      <input
        type="text"
        placeholder="Type for search"
        value={inputValue}
        onChange={onInputChange}
      />
      <button
        type="button"
        onClick={onSearchClick}
      >
        Search
      </button>
    </div>
  );
};

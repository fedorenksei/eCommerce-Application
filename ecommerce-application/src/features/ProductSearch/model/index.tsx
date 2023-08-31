import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ProductSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [, setSearchParams] = useSearchParams();
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const entered = e.target.value;
    setInputValue(() => {
      return entered;
    });
  };

  const onSearch = () => {
    setSearchParams({
      text: 'test',
    });
  };

  return (
    <div className="w-full text-center">
      <input
        className="border-2 border-slate-800"
        onInput={onInputChange}
        value={inputValue}
        type="text"
      />
      <button
        className="border-2 border-slate-800"
        onClick={onSearch}
        type="button"
      >
        Search
      </button>
    </div>
  );
};

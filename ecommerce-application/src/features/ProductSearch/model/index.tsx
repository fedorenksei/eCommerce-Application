import React, { useState } from 'react';

export const ProductSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const entered = e.target.value;
    setInputValue(() => {
      return entered;
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
        type="button"
      >
        Search
      </button>
    </div>
  );
};

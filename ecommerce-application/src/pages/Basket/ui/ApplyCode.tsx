import { useState } from 'react';
import { Header5 } from '../../../shared/ui/text/Header5';
import { getButtonStyles, getInputStyles } from '../../../shared/ui/styles';

export const ApplyCode = () => {
  const [inputValue, setInputValue] = useState('');
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };
  const onApplyClick = () => {
    console.log(inputValue);
  };
  return (
    <div className="p-4 space-y-2">
      <Header5>Apply discount code!</Header5>
      <div className="space-y-2 space-x-2">
        <input
          type="text"
          placeholder="Type for search"
          value={inputValue}
          onChange={onInputChange}
          className={getInputStyles({})}
        />
        <button
          type="button"
          onClick={onApplyClick}
          className={getButtonStyles({
            size: 'small',
            filling: 'filled',
            shape: 'round',
          })}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

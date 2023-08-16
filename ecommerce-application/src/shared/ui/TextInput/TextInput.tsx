import React from 'react';
import clsx from 'clsx';

type TextInputProps = {
  placeholder: string;
  defaultValue?: string;
  disabled?: boolean;
};

export const TextInput = ({
  disabled,
  placeholder,
  defaultValue,
}: TextInputProps) => {
  return (
    <input
      type="text"
      disabled={disabled}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={clsx(
        'px-4 py-3 w-full bg-stone-50',
        [
          'rounded-md border-0',
          '!outline-none ring-1 ring-inset ring-neutral-200',
          'focus:ring-2 focus:ring-primary-color',
        ],
        !disabled && 'focus:shadow-md hover:shadow-md transition-shadow',
        'placeholder:text-gray-400 text-neutral-600 text-sm font-sans font-normal leading-7 tracking-wider',
        disabled && 'placeholder:text-gray-300',
      )}
    />
  );
};

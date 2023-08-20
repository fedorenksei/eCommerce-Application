import React from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

type TextInputProps = {
  type?: 'text' | 'password' | 'date';
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  inputId: string;
};

export const TextInput = ({
  type = 'text',
  disabled,
  placeholder,
  defaultValue,
  register,
  inputId,
}: TextInputProps) => {
  return (
    <input
      id={inputId}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={clsx(
        'px-4 py-3 max-w-[400px]',
        'bg-bg-color dark:bg-[#394267]',
        [
          'rounded-md',
          'border-0 !outline-none',
          ['ring-1 ring-inset', 'ring-neutral-200 dark:ring-slate-600'],
          [
            'focus:ring-2',
            'focus:ring-primary-color dark:focus:ring-primary-color',
          ],
        ],
        !disabled && [
          'focus:shadow-lg hover:shadow-md transition-shadow',
          'dark:shadow-slate-700',
          'hover:ring-hover-color dark:hover:ring-hover-color',
        ],
        'text-sm font-sans font-normal leading-7 tracking-wider',
        'text-neutral-600 dark:text-dt-text-color',
        'placeholder:text-gray-400',
        disabled && 'placeholder:text-gray-300 dark:placeholder:text-slate-800',
      )}
      {...register}
    />
  );
};

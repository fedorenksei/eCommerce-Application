import React, { useState } from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import { getInputStyles } from '../../styles';
import { TextInputType } from '../../../types/types';

type TextInputProps = {
  type?: TextInputType;
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
  const [showPassword, setShowPassword] = useState(false);
  const [focusStyle, setFocusStyle] = useState(false);

  return (
    <div
      className={clsx(
        getInputStyles({ disabled, focus: focusStyle }),
        type === 'password' && 'mr-5',
        'flex',
      )}
      onFocus={() => {
        setFocusStyle(true);
      }}
      onBlur={() => {
        setFocusStyle(false);
      }}
    >
      <input
        id={inputId}
        type={showPassword ? 'text' : type}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="appearance-none !outline-none flex-grow"
        {...register}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword((c) => !c)}
        >
          <img
            className={clsx(
              'w-6 left-full -right-10 top-0 bottom-0 m-auto cursor-pointer',
            )}
            src="./images/eye-password-hide.svg"
            alt="show or hide"
          />
        </button>
      )}
    </div>
  );
};

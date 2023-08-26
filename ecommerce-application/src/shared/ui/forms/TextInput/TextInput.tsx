import React, { useState } from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import { getInputStyles } from '../../styles';
import { TextInputType } from '../../../types/types';
import { Eye } from './Eye';

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
        'flex gap-2',
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
        className="appearance-none !outline-none flex-grow bg-input-bg dark:bg-dt-input-bg"
        {...register}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword((c) => !c)}
        >
          <Eye opened={!showPassword} />
        </button>
      )}
    </div>
  );
};

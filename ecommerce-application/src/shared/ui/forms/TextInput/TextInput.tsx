import React, { useState } from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import { getInputStyles } from '../../styles';
import { TextInputType } from '../../../types/types';
import { Eye } from './Eye';
import { BsSearch } from 'react-icons/bs';

type TextInputProps = {
  type?: TextInputType;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  inputId?: string;
  enterKeyHint?: 'search';
};

export const TextInput = ({
  type = 'text',
  disabled,
  placeholder,
  defaultValue,
  register,
  inputId,
  enterKeyHint,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusStyle, setFocusStyle] = useState(false);

  let htmlInputType = type;
  if (showPassword) htmlInputType = 'text';
  if (htmlInputType === 'search') htmlInputType = 'text';

  return (
    <div
      className={clsx(
        getInputStyles({ disabled, focus: focusStyle }),
        type === 'password' && 'mr-5',
        'flex gap-2 items-center',
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
        type={htmlInputType}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        enterKeyHint={enterKeyHint}
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
      {type === 'search' && <BsSearch size="1.5em" />}
    </div>
  );
};

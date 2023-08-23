import React, { useState } from 'react';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import { getInputStyles } from '../../styles';

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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mr-5">
      <input
        id={inputId}
        type={showPassword ? 'text' : type}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={getInputStyles({ disabled })}
        {...register}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword((c) => !c)}
        >
          <img
            className="w-6 absolute left-full -right-10 top-0 bottom-0 m-auto cursor-pointer"
            src="./images/eye-password-hide.svg"
            alt="show or hide"
          />
        </button>
      )}
    </div>
  );
};

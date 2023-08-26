import React from 'react';
import { useId } from 'react';
import { Header5 } from '../../text/Header5';
import { TextInput } from '../TextInput';
import { UseFormRegisterReturn } from 'react-hook-form';
import { TextInputType } from '../../../types/types';

type TextInputGroupProps = {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  type?: TextInputType;
};

export const TextInputGroup = ({
  label,
  error,
  register,
  type,
}: TextInputGroupProps) => {
  const inputId = useId();
  return (
    <>
      <label
        htmlFor={inputId}
        className="place-self-start form-bp:h-[52px] flex items-center cursor-pointer"
      >
        <Header5>{label}</Header5>
      </label>
      <div className="flex flex-col gap-3">
        <TextInput
          inputId={inputId}
          register={register}
          type={type || 'text'}
        />
        {error && (
          <p className="form-bp:col-start-2 text-danger-color mx-4">{error}</p>
        )}
      </div>
    </>
  );
};

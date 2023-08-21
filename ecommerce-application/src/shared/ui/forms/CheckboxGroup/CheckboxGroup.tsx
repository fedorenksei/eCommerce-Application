import React from 'react';
import { PropsWithChildren } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import { Paragraph } from '../../text/Paragraph';

type CheckboxGroupProps = PropsWithChildren<{
  label: string;
  error?: string;
  register?: UseFormRegisterReturn;
  checked?: boolean;
}>;

export const CheckboxGroup = ({
  label,
  error,
  children,
}: CheckboxGroupProps) => {
  return (
    <>
      <label
        className={clsx(
          'form-bp:col-span-2 flex justify-between gap-3',
          'border rounded-xl border-neutral-200 hover:border-hover-color px-4',
          'hover:shadow-md transition-shadow',
          'dark:shadow-slate-700',
        )}
      >
        <div className="place-self-start form-bp:h-[52px] flex items-center">
          <Paragraph>{label}</Paragraph>
        </div>
        {children}
      </label>
      {error && (
        <p className="form-bp:col-span-2 text-danger-color mx-4">{error}</p>
      )}
    </>
  );
};

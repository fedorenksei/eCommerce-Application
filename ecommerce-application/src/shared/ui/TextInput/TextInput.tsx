import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

export const TextInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={clsx(
        'px-4 py-3 w-full bg-stone-50',
        [
          'rounded-md border-0',
          '!outline-none ring-1 ring-inset ring-neutral-200',
          'focus:ring-2 focus:ring-primary-color',
        ],
        !props.disabled && 'focus:shadow-md hover:shadow-md transition-shadow',
        'placeholder:text-gray-400 text-neutral-600 text-sm font-sans font-normal leading-7 tracking-wider',
        props.disabled && 'placeholder:text-gray-300',
      )}
      type="text"
      {...props}
    />
  );
};

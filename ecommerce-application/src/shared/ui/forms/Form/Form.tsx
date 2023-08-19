import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type FormProps = PropsWithChildren<{
  onSubmit: () => void;
}>;

export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx(
        'w-full',
        'grid form-bp:gap-y-10 gap-y-5 gap-x-10 justify-center items-center',
        'form-bp:grid-cols-[max-content_minmax(200px,_400px)] grid-cols-1',
      )}
    >
      {children}
    </form>
  );
};

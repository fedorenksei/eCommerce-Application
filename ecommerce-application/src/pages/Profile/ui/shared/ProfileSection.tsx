import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const ProfileSection = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={clsx(
        'p-5',
        'text-start',
        'border rounded-md',
        'flex flex-col gap-5',
      )}
    >
      {children}
    </div>
  );
};

import { PropsWithChildren } from 'react';
import { getButtonStyles } from '../../styles';

type FormButtonProps = PropsWithChildren<{
  type: 'submit' | 'button';
  disabled?: boolean;
}>;

export const FormButton = ({ children, type, disabled }: FormButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={getButtonStyles({
        size: 'small',
        shape: 'round',
        color: 'filled',
        disabled: disabled,
      })}
    >
      {children}
    </button>
  );
};

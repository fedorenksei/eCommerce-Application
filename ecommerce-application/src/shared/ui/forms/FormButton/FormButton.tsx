import { PropsWithChildren } from 'react';
import { getButtonStyles } from '../../styles';

type FormButtonProps = PropsWithChildren<{
  type: 'submit' | 'button';
  secondary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}>;

export const FormButton = ({
  children,
  type,
  onClick,
  disabled,
  secondary,
}: FormButtonProps) => {
  const styles = getButtonStyles({
    size: 'medium',
    shape: 'round',
    color: secondary ? 'transparent' : 'filled',
    disabled: disabled,
  });

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  );
};

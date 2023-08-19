import { getButtonStyles } from '../styles';

type ButtonProps = {
  onClick: () => void;
};

export const Button = ({ onClick }: ButtonProps) => {
  const styles = getButtonStyles({
    size: 'small',
    shape: 'round',
    color: 'filled',
  });
  return (
    <button
      onClick={onClick}
      className={styles}
    >
      <span>Submit</span>
    </button>
  );
};

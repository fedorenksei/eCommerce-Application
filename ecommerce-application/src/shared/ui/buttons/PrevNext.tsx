import { getButtonStyles } from '../styles';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const ButtonPrevOrNext = ({
  onClick,
  disabled,
  type,
}: ButtonProps & { type: 'prev' | 'next' }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={getButtonStyles({
        size: 'small',
        filling: 'transparent',
        shape: 'round',
        disabled: disabled,
        icon: true,
      })}
    >
      {type === 'prev' ? (
        <BsArrowLeftCircle
          size="1.5em"
          title="Previous"
        />
      ) : (
        <BsArrowRightCircle
          size="1.5em"
          title="Next page"
        />
      )}
    </button>
  );
};

export const ButtonPrevious = (props: ButtonProps) => {
  return (
    <ButtonPrevOrNext
      type="prev"
      {...props}
    />
  );
};

export const ButtonNext = (props: ButtonProps) => {
  return (
    <ButtonPrevOrNext
      type="next"
      {...props}
    />
  );
};

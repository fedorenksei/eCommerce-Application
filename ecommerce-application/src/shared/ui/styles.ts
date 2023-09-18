import clsx from 'clsx';

type TextStyleParams = {
  font?: 'simple' | 'h2' | 'h3' | 'h4' | 'h5';
  color?: 'default' | 'second' | 'light' | 'primary' | 'danger';
  link?: boolean;
};

export function getTextStyles({
  font = 'simple',
  color = 'default',
  link = false,
}: TextStyleParams) {
  return clsx(
    'font-[Montserrat] tracking-[0.2px]',
    {
      h2: 'text-[40px] leading-[57px] font-bold',
      h3: 'text-2xl font-bold',
      h4: 'text-xl leading-[30px] font-medium',
      h5: 'text-base font-bold',
      simple: 'text-sm font-medium',
    }[font],
    {
      default: 'text-text-color dark:text-dt-text-color',
      second: 'text-second-text-color dark:text-dt-second-text-color',
      light: 'text-dt-text-color',
      primary: 'text-primary-color',
      danger: 'text-danger-color',
    }[color],
    link && 'transition hover:text-primary-color',
  );
}

type ButtonStyleParams = {
  size: 'small' | 'medium' | 'large';
  shape: 'square' | 'round';
  filling: 'filled' | 'transparent';
  color?: 'primary' | 'danger';
  disabled?: boolean;
  switchable?: boolean;
  isTurnedOn?: boolean;
};

export function getButtonStyles({
  size,
  shape,
  filling,
  color = 'primary',
  disabled,
}: ButtonStyleParams) {
  const textStyles = getTextStyles({
    font: size === 'large' ? 'h3' : 'h5',
    color: filling === 'filled' ? 'light' : color,
  });

  return clsx(
    'inline-flex justify-center items-center',
    'transition-all',
    [
      size !== 'small' && 'md:px-[40px] md:py-[15px] md:gap-[15px]',
      'px-[20px] py-[10px] gap-[10px]',
    ],
    '!outline-none',
    {
      filled: [
        !disabled &&
          {
            primary: 'bg-primary-color hover:bg-hover-color',
            danger: 'bg-danger-color hover:bg-danger-hover-color',
          }[color],
        disabled &&
          {
            primary: 'bg-disabled-color',
            danger: 'bg-danger-disabled-color',
          }[color],
        'focus:ring-2 focus:ring-dt-bg-color dark:focus:ring-bg-color',
      ],
      transparent: [
        'bg-transparent ring-1',
        {
          primary: 'ring-primary-color',
          danger: 'ring-danger-color',
        }[color],
        !disabled &&
          {
            primary: 'hover:ring-hover-color hover:text-hover-color',
            danger:
              'hover:ring-danger-hover-color hover:text-danger-hover-color',
          }[color],
        disabled &&
          {
            primary: '!ring-disabled-color !text-disabled-color',
            danger: '!ring-danger-disabled-color !text-danger-disabled-color',
          }[color],
        'focus:ring-2 focus:ring-dt-bg-color dark:focus:ring-bg-color',
      ],
    }[filling],
    !disabled && ['focus:shadow-lg hover:shadow-md', 'dark:shadow-slate-700'],
    {
      square: 'rounded-[5px]',
      round: 'rounded-full',
    }[shape],
    textStyles,
  );
}

type InputStyleParams = {
  disabled?: boolean;
  focus?: boolean;
};

export function getInputStyles({ disabled, focus }: InputStyleParams) {
  return clsx(
    'appearance-none',
    'px-4 py-3 max-w-[400px] w-full',
    'bg-input-bg dark:bg-dt-input-bg',
    [
      'rounded-md',
      'border-0 !outline-none',
      'ring-1 ring-inset',
      [
        focus
          ? 'ring-2 ring-primary-color dark:ring-primary-color'
          : 'ring-neutral-200 dark:ring-slate-600',
        'focus:ring-2 focus:ring-primary-color dark:focus:ring-primary-color',
      ],
    ],
    !disabled && [
      [focus && 'shadow-lg', 'focus:shadow-lg'],
      'hover:shadow-md transition-shadow',
      'dark:shadow-slate-700',
      !focus && 'hover:ring-hover-color dark:hover:ring-hover-color',
    ],
    'text-sm font-sans font-normal leading-7 tracking-wider',
    'text-neutral-600 dark:text-dt-text-color',
    'placeholder:text-gray-400',
    disabled && 'placeholder:text-gray-300 dark:placeholder:text-slate-800',
  );
}

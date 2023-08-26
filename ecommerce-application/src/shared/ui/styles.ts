import clsx from 'clsx';

type TextStyleParams = {
  font?: 'simple' | 'h2' | 'h3' | 'h5';
  color?: 'default' | 'second' | 'light' | 'primary';
};

export function getTextStyles({
  font = 'simple',
  color = 'default',
}: TextStyleParams) {
  return clsx(
    'font-[Montserrat] tracking-[0.2px]',
    {
      h2: 'text-[40px] leading-[57px] font-bold',
      h3: 'text-2xl font-bold',
      h5: 'text-base font-bold',
      simple: 'text-sm font-medium',
    }[font],
    {
      default: 'text-text-color dark:text-dt-text-color',
      second: 'text-second-text-color dark:text-dt-second-text-color',
      light: 'text-dt-text-color',
      primary: 'text-primary-color',
    }[color],
  );
}

type ButtonStyleParams = {
  size: 'small' | 'medium' | 'large';
  shape: 'square' | 'round';
  color: 'filled' | 'transparent';
  disabled?: boolean;
};

export function getButtonStyles({
  size,
  shape,
  color,
  disabled,
}: ButtonStyleParams) {
  const textStyles = getTextStyles({
    font: size === 'large' ? 'h3' : 'h5',
    color: color === 'filled' ? 'light' : 'primary',
  });

  return clsx(
    'w-max inline-flex justify-center items-center',
    'transition-all',
    [
      size !== 'small' && 'md:px-[40px] md:py-[15px] md:gap-[15px]',
      'px-[20px] py-[10px] gap-[10px]',
    ],
    '!outline-none',
    {
      filled: [
        !disabled && 'bg-primary-color hover:bg-hover-color',
        disabled && 'bg-disabled-color',
        'focus:ring-2 focus:ring-dt-bg-color dark:focus:ring-bg-color',
      ],
      transparent: [
        'bg-transparent',
        'border border-primary-color',
        !disabled && 'hover:border-hover-color hover:text-hover-color',
        'focus:border-2 focus:border-dt-bg-color dark:focus:border-bg-color',
      ],
    }[color],
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
    'bg-bg-color dark:bg-[#394267]',
    [
      'rounded-md',
      'border-0 !outline-none',
      ['ring-1 ring-inset', 'ring-neutral-200 dark:ring-slate-600'],
      [
        focus && 'ring-2',
        focus && 'ring-primary-color dark:ring-primary-color',
      ],
    ],
    !disabled && [
      focus && 'focus:shadow-lg',
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

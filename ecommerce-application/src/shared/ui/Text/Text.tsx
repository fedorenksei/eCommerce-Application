import React from 'react';
import clsx from 'clsx';

type HeaderTag = 'h3' | 'h5';

type TextComponentProps = {
  text: string;
  tag: HeaderTag | 'p' | 'span';
  font?: HeaderTag | 'simple';
  color?: 'default' | 'second' | 'light' | 'primary';
};

/**
 * Abstract text component
 * @prop text - content of element
 * @prop tag - html tag (as string): `p`, `span`, `h1` - `h5`
 * @prop font (opt) - font styling: `'simple'` (default) as in paragraphs (default) and `h1` - `h5`
 */
export const Text = ({
  text,
  tag,
  font,
  color = 'default',
}: TextComponentProps) => {
  if (tag === 'p' || tag === 'span') {
    font = 'simple';
  } else {
    font = tag;
  }

  const Tag = tag;
  return (
    <Tag
      className={clsx(
        'font-[Montserrat] tracking-[0.2px]',
        {
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
      )}
    >
      {text}
    </Tag>
  );
};

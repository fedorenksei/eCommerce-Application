import { FC } from 'react';

export type Ionicon = FC<{
  title?: string;
  color?: string;
  style?: React.CSSProperties;
  fontSize?: string;
  rotate?: boolean;
  shake?: boolean;
  className?: string;
  beat?: boolean;
  onClick?: (event?: Event) => void;
  children?: React.ReactNode;
}>;

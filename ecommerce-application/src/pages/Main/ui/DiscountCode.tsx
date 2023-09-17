import clsx from 'clsx';
import { getTextStyles } from '../../../shared/ui/styles';
import { Header5 } from '../../../shared/ui/text/Header5';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { PropsWithChildren } from 'react';

interface DiscountCodeProps {
  name: string;
  description: string;
  code: string;
}

const GradientBorder = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-min p-[4px] rounded-[8px] bg-gradient-to-r from-primary-color via-disabled-color to-hover-color">
      <div className="h-full w-full rounded-[5px] bg-bg-color dark:bg-dt-bg-color">
        {children}
      </div>
    </div>
  );
};

export const DiscountCode = ({
  name,
  description,
  code,
}: DiscountCodeProps) => {
  return (
    <GradientBorder>
      <div className="p-4 w-max">
        <Header5>{name}</Header5>
        <Paragraph>{description}</Paragraph>
        <span className={clsx(getTextStyles({ font: 'h3' }), 'font-normal')}>
          {code}
        </span>
      </div>
    </GradientBorder>
  );
};

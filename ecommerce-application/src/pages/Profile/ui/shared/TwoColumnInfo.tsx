import React from 'react';
import clsx from 'clsx';
import { Header5 } from '../../../../shared/ui/text/Header5';
import { Paragraph } from '../../../../shared/ui/text/Paragraph';

interface TwoColumnInfoProps {
  data: [string, string][];
}

export const TwoColumnInfo = ({ data }: TwoColumnInfoProps) => {
  return (
    <div
      className={clsx(
        'grid gap-y-5 gap-x-10 justify-start items-center',
        'form-bp:grid-cols-[max-content_minmax(200px,_400px)] grid-cols-[minmax(200px,_400px)]',
      )}
    >
      {data.map(([parameter, value], i) => (
        <React.Fragment key={`profile-item-label-${i}`}>
          <div className="place-self-start form-bp:h-[52px] flex items-center cursor-pointer">
            <Header5>{parameter}</Header5>
          </div>
          <div>
            <Paragraph>{value}</Paragraph>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

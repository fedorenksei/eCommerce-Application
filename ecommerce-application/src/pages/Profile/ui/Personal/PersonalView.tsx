import clsx from 'clsx';
import { PersonalData } from '../../../../shared/types/interfaces';
import { Header5 } from '../../../../shared/ui/text/Header5';
import { Paragraph } from '../../../../shared/ui/text/Paragraph';
import React from 'react';

interface PersonalViewProps {
  data: PersonalData;
}

export const PersonalView = ({
  data: { firstName, lastName, email, dateOfBirth },
}: PersonalViewProps) => {
  const contents = [
    ['First name', firstName],
    ['Last name', lastName],
    ['Email', email],
    ['Date of birth', dateOfBirth],
  ];

  return (
    <div
      className={clsx(
        'grid gap-y-5 gap-x-10 justify-start items-center',
        'form-bp:grid-cols-[max-content_minmax(200px,_400px)] grid-cols-[minmax(200px,_400px)]',
      )}
    >
      {contents.map(([property, value], i) => (
        <React.Fragment key={`profile-item-label-${i}`}>
          <div className="place-self-start form-bp:h-[52px] flex items-center cursor-pointer">
            <Header5>{property}</Header5>
          </div>
          <div>
            <Paragraph>{value}</Paragraph>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

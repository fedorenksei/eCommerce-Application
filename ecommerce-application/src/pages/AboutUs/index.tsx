import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { membersData } from './data';
import { Member } from './ui/Member';

export const AboutUs = () => {
  return (
    <div className="p-10 space-y-3 text-center">
      <Header2>Our team</Header2>
      <div className="grid grid-cols-[minmax(0,_400px)] justify-center lg:grid-cols-3 gap-4">
        {membersData.map((member) => (
          <Member
            {...member}
            key={`${member.github}`}
          />
        ))}
      </div>
    </div>
  );
};

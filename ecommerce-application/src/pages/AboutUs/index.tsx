import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { membersData } from './data';
import { Member } from './ui/Member';
import { Contribution } from './ui/Contribution';

export const AboutUs = () => {
  return (
    <div className="p-5 md:p-10 space-y-7 max-w-7xl mx-auto text-center">
      <section className="space-y-3">
        <Header2>Our team</Header2>
        <div className="grid grid-cols-[minmax(0,_400px)] justify-center lg:grid-cols-3 gap-4">
          {membersData.map((member) => (
            <Member
              {...member}
              key={`${member.github}`}
            />
          ))}
        </div>
      </section>
      <Header2>Members&apos; contribution</Header2>
      <Contribution membersData={membersData} />
    </div>
  );
};

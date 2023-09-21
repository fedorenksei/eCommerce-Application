import React from 'react';
import { Header2 } from '../../shared/ui/text/Header2';
import { membersData } from './data';
import { Member } from './ui/Member';
import { Contribution } from './ui/Contribution';
import { Paragraph } from '../../shared/ui/text/Paragraph';
import { RssLogo } from './ui/RssLogo';

export const AboutUs = () => {
  return (
    <div className="p-5 md:p-10 space-y-7 max-w-7xl mx-auto text-center">
      <section className="space-y-3 mx-auto max-w-[600px]">
        <Header2>Meet our Agile team</Header2>
        <Paragraph>
          We&apos;re a team of three developers, and our project was an
          educational exercise, not a real bike shop. We embraced Agile methods,
          breaking our work into sprints, providing daily updates in our chat,
          and conducting planning meetings. We maintained open communication to
          address challenges promptly and even held a retrospective session.
          With the guidance of our mentor acting as a Scrum Master, we navigated
          project management effectively.
        </Paragraph>
      </section>

      <section className="space-y-3">
        <Header2>Team&apos;s members</Header2>
        <div className="grid grid-cols-[minmax(0,_400px)] justify-center lg:grid-cols-3 gap-4">
          {membersData.map((member) => (
            <Member
              {...member}
              key={`${member.github}`}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <Header2>Members&apos; contribution</Header2>
        <Contribution membersData={membersData} />
      </section>

      <section className="space-y-3 mx-auto max-w-[600px]">
        <Header2>Our gratitude</Header2>

        <Paragraph>
          We are very grateful to our mentor,{' '}
          <a
            href="https://github.com/Margaryta-Maletz"
            rel="noopener noreferrer"
            target="_blank"
            className={'text-hover-color hover:text-primary-color'}
          >
            Margaryta Maletz
          </a>
          , for her sensitive guidance and support, constant communication, and
          unwavering belief in our success. We are equally thankful to Rolling
          Scopes School for organizing the educational process, the dedication
          of many mentors, lecturers, administrators, volunteers, and active
          students. Throughout our education and work on this project, we have
          elevated both our hard and soft skills to an entirely new level and
          are fueled with motivation to continue growing. Until we meet again!
        </Paragraph>

        <div className="max-w-[300px] mx-auto pt-4">
          <RssLogo />
        </div>
      </section>
    </div>
  );
};

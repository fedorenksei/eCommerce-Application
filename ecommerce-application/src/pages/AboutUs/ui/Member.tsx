import clsx from 'clsx';
import { Header3 } from '../../../shared/ui/text/Header3';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { MemberData } from '../data';
import { BsGithub } from 'react-icons/bs';
import { getTextStyles } from '../../../shared/ui/styles';

export const Member = ({
  name,
  surname,
  imageUrl,
  github,
  roles,
  shortBio,
}: MemberData) => {
  return (
    <div className="border rounded-md p-3 flex flex-col gap-4 items-center">
      <img
        src={imageUrl}
        alt={`${name} ${surname}`}
        className="w-40 h-40 object-cover rounded-full"
      />

      <Header3>
        {name} {surname}
      </Header3>

      <a
        href={`https://github.com/${github}`}
        className={clsx(
          'flex gap-2 justify-center items-center',
          getTextStyles({ link: true }),
        )}
      >
        <BsGithub size="1em" /> {github}
      </a>

      <Paragraph>{shortBio}</Paragraph>

      <div className="flex flex-wrap gap-2 justify-center items-center">
        {roles.map((role) => (
          <div
            key={`${github}-${role}`}
            className="border border-neutral-700 rounded-lg p-2"
          >
            <span className={getTextStyles({})}>{role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

import { PersonalData } from '../../../../shared/types/interfaces';
import { TwoColumnInfo } from '../shared/TwoColumnInfo';

interface PersonalViewProps {
  data: PersonalData;
}

export const PersonalView = ({
  data: { firstName, lastName, email, dateOfBirth },
}: PersonalViewProps) => {
  const contents: [string, string][] = [
    ['First name', firstName],
    ['Last name', lastName],
    ['Email', email],
    ['Date of birth', dateOfBirth],
  ];

  return <TwoColumnInfo data={contents} />;
};

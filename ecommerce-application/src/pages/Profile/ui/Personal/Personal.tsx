import { useState } from 'react';
import { CustomerData } from '../../../../shared/types/interfaces';
import { Header3 } from '../../../../shared/ui/text/Header3';
import { PersonalEdit } from './PersonalEdit';
import { EditButton } from '../shared/EditButton';
import { PersonalView } from './PersonalView';
import { ProfileSection } from '../shared/ProfileSection';

export const Personal = ({
  firstName,
  lastName,
  email,
  dateOfBirth,
}: CustomerData) => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode((em) => !em);
  };

  return (
    <ProfileSection>
      <div className="flex flex-wrap justify-between gap-2">
        <Header3>Personal information</Header3>
        <EditButton
          editMode={editMode}
          onClick={toggleEditMode}
        />
      </div>
      {!editMode ? (
        <PersonalView
          data={{
            firstName,
            lastName,
            email,
            dateOfBirth,
          }}
        />
      ) : (
        <PersonalEdit
          data={{
            firstName,
            lastName,
            email,
            dateOfBirth,
          }}
          toggleEditMode={toggleEditMode}
        />
      )}
    </ProfileSection>
  );
};

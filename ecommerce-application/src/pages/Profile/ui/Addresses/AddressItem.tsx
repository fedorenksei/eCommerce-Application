import { useState } from 'react';
import { CustomerAddressWithId } from '../../../../shared/types/interfaces';
import { EditButton } from '../shared/EditButton';
import { ProfileSection } from '../shared/ProfileSection';
import { AddressEdit } from './AddressEdit';
import { Paragraph } from '../../../../shared/ui/text/Paragraph';
import { AddressLabels } from './Labels';

interface AddressItemProps {
  data: CustomerAddressWithId;
  isShipping: boolean;
  isBilling: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

export const AddressItem = ({
  data,
  isShipping,
  isBilling,
  isDefaultShipping,
  isDefaultBilling,
}: AddressItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => {
    setEditMode((em) => !em);
  };

  return (
    <ProfileSection>
      <div className="flex justify-between items-start gap-3">
        {editMode ? (
          <AddressEdit
            data={data}
            toggleEditMode={toggleEditMode}
          />
        ) : (
          <div className="flex flex-col items-start gap-2">
            <AddressLabels
              {...{
                isShipping,
                isBilling,
                isDefaultShipping,
                isDefaultBilling,
              }}
            />
            <Paragraph>
              {data.country}, {data.city}, {data.streetName}, {data.postalCode}
            </Paragraph>
          </div>
        )}
        <EditButton
          editMode={editMode}
          onClick={toggleEditMode}
        />
      </div>
    </ProfileSection>
  );
};

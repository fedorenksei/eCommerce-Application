import { useState } from 'react';
import { CustomerAddressWithId } from '../../../../shared/types/interfaces';
import { EditButton } from '../shared/EditButton';
import { ProfileSection } from '../shared/ProfileSection';
import { AddressForm } from './AddressForm';
import { AddressLabels } from './Labels';
import { AddressUsage } from './AddressUsage';
import { AddressView } from './AddressView';
import { DeleteButton } from './DeleteButton';

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
      {editMode ? (
        <AddressForm
          data={data}
          closeForm={toggleEditMode}
        />
      ) : (
        <div className="flex flex-col items gap-5">
          <AddressLabels
            {...{
              isShipping,
              isBilling,
              isDefaultShipping,
              isDefaultBilling,
            }}
          />
          <div className="flex items-end justify-between flex-wrap-reverse gap-2">
            <AddressView data={data} />
            <div className="flex gap-3 flex-wrap flex-1 justify-end">
              <EditButton
                editMode={editMode}
                onClick={toggleEditMode}
              />
              <DeleteButton id={data.id} />
            </div>
          </div>
          <AddressUsage
            type="shipping"
            addressId={data.id}
            isAllowed={isShipping}
            isDefault={isDefaultShipping}
          />
          <AddressUsage
            type="billing"
            addressId={data.id}
            isAllowed={isBilling}
            isDefault={isDefaultBilling}
          />
        </div>
      )}
    </ProfileSection>
  );
};

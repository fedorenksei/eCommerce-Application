import { CustomerData } from '../../../../shared/types/interfaces';
import { FormButton } from '../../../../shared/ui/forms/FormButton';
import { Header3 } from '../../../../shared/ui/text/Header3';
import { useToggle } from '../../../../shared/utils/hooks';
import { ProfileSection } from '../shared/ProfileSection';
import { AddressForm } from './AddressForm';
import { AddressItem } from './AddressItem';

export const Addresses = ({
  addresses,
  defaultShippingAddressId,
  defaultBillingAddressId,
  shippingAddressIds,
  billingAddressIds,
}: CustomerData) => {
  const [isAdding, toggleAdding] = useToggle();
  const addressesData = transformAddresses({
    addresses,
    defaultShippingAddressId,
    defaultBillingAddressId,
    shippingAddressIds,
    billingAddressIds,
  });

  return (
    <>
      <ProfileSection>
        <Header3>Your addresses</Header3>

        {addressesData.map((address, i) => (
          <AddressItem
            {...address}
            key={`profile-shipping-${i}`}
          />
        ))}

        {isAdding ? (
          <ProfileSection>
            <AddressForm closeForm={toggleAdding} />
          </ProfileSection>
        ) : (
          <div className="flex justify-center">
            <FormButton
              type="button"
              onClick={toggleAdding}
            >
              Add address
            </FormButton>
          </div>
        )}
      </ProfileSection>
    </>
  );
};

function transformAddresses({
  addresses,
  defaultShippingAddressId,
  defaultBillingAddressId,
  shippingAddressIds,
  billingAddressIds,
}: Pick<
  CustomerData,
  | 'addresses'
  | 'defaultShippingAddressId'
  | 'defaultBillingAddressId'
  | 'shippingAddressIds'
  | 'billingAddressIds'
>) {
  return addresses.map((address) => {
    const id = address.id;
    return {
      data: { ...address },
      isShipping: shippingAddressIds.includes(id),
      isBilling: billingAddressIds.includes(id),
      isDefaultShipping: defaultShippingAddressId === id,
      isDefaultBilling: defaultBillingAddressId === id,
    };
  });
}

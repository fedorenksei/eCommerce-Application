import { CustomerData } from '../../../../shared/types/interfaces';
import { Header3 } from '../../../../shared/ui/text/Header3';
import { ProfileSection } from '../shared/ProfileSection';
import { AddressItem } from './AddressItem';

export const Addresses = ({
  addresses,
  defaultShippingAddressId,
  defaultBillingAddressId,
  shippingAddressIds,
  billingAddressIds,
}: CustomerData) => {
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

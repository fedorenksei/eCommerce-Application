import { CustomerAddress } from '../../../../shared/types/interfaces';
import { TwoColumnInfo } from '../shared/TwoColumnInfo';

interface AddressViewProps {
  data: CustomerAddress;
}

export const AddressView = ({
  data: { country, city, streetName, postalCode },
}: AddressViewProps) => {
  const contents: [string, string][] = [
    ['Country', country],
    ['City', city],
    ['Street', streetName],
    ['Postal code', postalCode],
  ];

  return <TwoColumnInfo data={contents} />;
};

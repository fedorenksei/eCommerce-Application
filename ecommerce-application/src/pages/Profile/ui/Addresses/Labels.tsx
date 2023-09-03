import { Paragraph } from '../../../../shared/ui/text/Paragraph';

interface AddressLabelsProps {
  isShipping: boolean;
  isBilling: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

const Label = ({ text }: { text: string }) => {
  return (
    <div className="inline border border-neutral-700 rounded-lg p-2">
      <Paragraph>{text}</Paragraph>
    </div>
  );
};

export const AddressLabels = ({
  isShipping,
  isBilling,
  isDefaultShipping,
  isDefaultBilling,
}: AddressLabelsProps) => {
  return (
    <>
      {isShipping && <Label text="shipping" />}
      {isBilling && <Label text="billing" />}
      {isDefaultShipping && <Label text="default shipping" />}
      {isDefaultBilling && <Label text="default shipping" />}
    </>
  );
};

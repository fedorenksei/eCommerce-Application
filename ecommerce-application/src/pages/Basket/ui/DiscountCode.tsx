import { Header5 } from '../../../shared/ui/text/Header5';
import {
  getButtonStyles,
  getInputStyles,
  getTextStyles,
} from '../../../shared/ui/styles';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import clsx from 'clsx';

export const DiscountCode = ({
  discountCodeId,
}: {
  discountCodeId?: string;
}) => {
  const discountCodes = useSelector(
    (state: RootState) => state.discountCodes.discountCodes,
  );
  const discountCodeData = discountCodes.filter(
    (code) => code.id === discountCodeId,
  )?.[0];

  const serverApi = ServerAPI.getInstance();
  const onApplyClick = ({ code }: { code: string }) => {
    serverApi.updateCart([{ action: 'addDiscountCode', code }]);
  };
  const onCancelClick = () => {
    serverApi.updateCart([
      {
        action: 'removeDiscountCode',
        discountCode: {
          typeId: 'discount-code',
          id: discountCodeId!,
        },
      },
    ]);
  };

  const { register, formState, handleSubmit } = useForm<{ code: string }>();

  return discountCodeData ? (
    <div className="p-2 border rounded-lg">
      <Paragraph>You have applied:</Paragraph>
      <div className="p-2 w-max mx-auto">
        <Header5>{discountCodeData.name}</Header5>
        <span className={clsx(getTextStyles({ font: 'h5' }), 'font-normal')}>
          {discountCodeData.code}
        </span>
      </div>
      <button
        onClick={() => {
          onCancelClick();
        }}
        className={getButtonStyles({
          shape: 'square',
          size: 'small',
          filling: 'transparent',
          color: 'danger',
        })}
      >
        Cancel
      </button>
    </div>
  ) : (
    <div className="p-4 space-y-2">
      <Header5>Apply discount code!</Header5>
      <form
        onSubmit={handleSubmit(onApplyClick)}
        className="space-y-2 space-x-2"
      >
        <input
          type="text"
          placeholder="Enter your discount code"
          className={getInputStyles({})}
          {...register('code')}
        />
        <button
          type="submit"
          className={getButtonStyles({
            size: 'small',
            filling: 'filled',
            shape: 'round',
            disabled: !formState.isDirty,
          })}
          disabled={!formState.isDirty}
        >
          Apply
        </button>
      </form>
    </div>
  );
};

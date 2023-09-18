import { Header5 } from '../../../shared/ui/text/Header5';
import { getButtonStyles, getInputStyles } from '../../../shared/ui/styles';
import { ServerAPI } from '../../../shared/api/ServerAPI';
import { useForm } from 'react-hook-form';

export const ApplyCode = () => {
  const serverApi = ServerAPI.getInstance();
  const onApplyClick = ({ code }: { code: string }) => {
    serverApi.updateCart([{ action: 'addDiscountCode', code }]);
  };
  const { register, formState, handleSubmit } = useForm<{ code: string }>();

  return (
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

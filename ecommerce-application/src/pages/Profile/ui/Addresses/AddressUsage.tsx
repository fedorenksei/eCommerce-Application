import { useDispatch } from 'react-redux';
import { ServerAPI } from '../../../../shared/api/ServerAPI';
import { getButtonStyles } from '../../../../shared/ui/styles';
import { setIsShown, setText } from '../../../../shared/store/modalSlice';

type AddressAction = 'add' | 'remove' | 'setDefault';

interface AddressUsageProps {
  type: 'shipping' | 'billing';
  addressId: string;
  isAllowed: boolean;
  isDefault: boolean;
}

export const AddressUsage = ({
  type,
  addressId,
  isAllowed,
  isDefault,
}: AddressUsageProps) => {
  const serverAPI = ServerAPI.getInstance();
  const dispatch = useDispatch();
  const getStyles = ({ disabled = false }: { disabled?: boolean }) => {
    return getButtonStyles({
      size: 'small',
      shape: 'square',
      filling: 'transparent',
      disabled,
    });
  };

  const sendAction = async (action: AddressAction) => {
    const actions = getAction({
      addressId,
      type,
      action,
    });
    const res = await serverAPI.updateCustomer(actions);

    dispatch(setIsShown({ isShown: true }));
    if (res) {
      dispatch(
        setText({
          text: 'You have successfully updated an address',
        }),
      );
    } else {
      dispatch(
        setText({
          text: 'Something went wrong, your address has not changed',
        }),
      );
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => sendAction(isAllowed ? 'remove' : 'add')}
        className={getStyles({})}
      >
        {isAllowed ? 'Remove from' : 'Add to'} {type}
      </button>
      <button
        onClick={() => sendAction('setDefault')}
        className={getStyles({ disabled: isDefault })}
        disabled={isDefault}
      >
        Set as default {type}
      </button>
    </div>
  );
};

function getAction({
  addressId,
  type,
  action,
}: {
  addressId: string;
  type: 'shipping' | 'billing';
  action: AddressAction;
}) {
  return [
    {
      action: `${action}${type[0].toUpperCase()}${type.slice(1)}Address${
        action === 'setDefault' ? '' : 'Id'
      }`,
      addressId,
    },
  ];
}

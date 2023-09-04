import { useDispatch } from 'react-redux';
import { ServerAPI } from '../../../../shared/api/ServerAPI';
import { getButtonStyles } from '../../../../shared/ui/styles';
import { setIsShown, setText } from '../../../../shared/store/modalSlice';

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const serverAPI = ServerAPI.getInstance();
  const dispatch = useDispatch();
  const onClick = async () => {
    const res = await serverAPI.updateCustomer([
      {
        action: 'removeAddress',
        addressId: id,
      },
    ]);
    console.log(res);

    dispatch(setIsShown({ isShown: true }));
    if (res) {
      dispatch(
        setText({
          text: 'You have successfully deleted an address',
        }),
      );
    } else {
      dispatch(
        setText({
          text: 'Something went wrong, your address has not been deleted',
        }),
      );
    }
  };

  return (
    <button
      onClick={onClick}
      className={getButtonStyles({
        shape: 'square',
        size: 'small',
        filling: 'transparent',
        color: 'danger',
      })}
    >
      Delete
    </button>
  );
};

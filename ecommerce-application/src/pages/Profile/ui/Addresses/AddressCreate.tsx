import { useForm } from 'react-hook-form';
import { FormButton } from '../../../../shared/ui/forms/FormButton';
import { Form } from '../../../../shared/ui/forms/Form';
import { useState } from 'react';
import { ServerAPI } from '../../../../shared/api/ServerAPI';
import { CustomerAddress } from '../../../../shared/types/interfaces';
import { CustomerUpdateAction } from '../../../../shared/types/types';
import { useDispatch } from 'react-redux';
import { setIsShown, setText } from '../../../../shared/store/modalSlice';
import Spinner from '../../../../shared/ui/Spinner';
import { AddressFormFields } from './AddressFormFields';

interface AddressCreateProps {
  closeForm: () => void;
}

export const AddressCreate = ({ closeForm }: AddressCreateProps) => {
  const serverAPI = ServerAPI.getInstance();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<CustomerAddress>({
    mode: 'onChange',
  });

  const onSubmit = async (newData: CustomerAddress) => {
    console.log(newData);

    setIsLoading(true);
    const actions = getUpdateActions({ ...newData });
    const res = await serverAPI.updateCustomer(actions);
    console.log(res);
    setIsLoading(false);
    closeForm();

    if (res) {
      dispatch(setIsShown({ isShown: true }));
      dispatch(
        setText({
          text: 'You have successfully added a new address',
        }),
      );
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <AddressFormFields
        register={register}
        formState={formState}
      />

      <div className="form-bp:col-span-2 flex justify-between">
        <FormButton
          type="button"
          onClick={closeForm}
          secondary={true}
        >
          Cancel
        </FormButton>
        <FormButton
          disabled={!formState.isDirty || !formState.isValid}
          type="submit"
        >
          Save
        </FormButton>
      </div>
    </Form>
  );
};

function getUpdateActions(data: CustomerAddress) {
  const actions: CustomerUpdateAction[] = [
    {
      action: 'addAddress',
      address: {
        streetName: data.streetName,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
      },
    },
  ];
  return actions;
}

import { useForm } from 'react-hook-form';
import { FormButton } from '../../../../shared/ui/forms/FormButton';
import { Form } from '../../../../shared/ui/forms/Form';
import { useState } from 'react';
import { ServerAPI } from '../../../../shared/api/ServerAPI';
import {
  CustomerAddress,
  CustomerAddressWithId,
} from '../../../../shared/types/interfaces';
import { CustomerUpdateAction } from '../../../../shared/types/types';
import { useDispatch } from 'react-redux';
import { setIsShown, setText } from '../../../../shared/store/modalSlice';
import Spinner from '../../../../shared/ui/Spinner';
import { AddressFormFields } from './AddressFormFields';

interface AddressFormProps {
  data?: CustomerAddressWithId;
  closeForm: () => void;
}

export const AddressForm = ({ data, closeForm }: AddressFormProps) => {
  const serverAPI = ServerAPI.getInstance();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<CustomerAddress>({
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = async (newData: CustomerAddress) => {
    console.log(newData);

    setIsLoading(true);
    const actions = getUpdateActions({ data: newData, id: data?.id });
    const res = await serverAPI.updateCustomer(actions);
    console.log(res);
    setIsLoading(false);
    closeForm();

    if (res) {
      dispatch(setIsShown({ isShown: true }));
      dispatch(
        setText({
          text: 'You have successfully updated an address',
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

function getUpdateActions({
  data,
  id,
}: {
  data: CustomerAddress;
  id?: string;
}): CustomerUpdateAction[] {
  const actionType = id ? 'changeAddress' : 'addAddress';
  const address: { [index: string]: string } = {
    streetName: data.streetName,
    postalCode: data.postalCode,
    city: data.city,
    country: data.country,
  };
  if (id) {
    address.addressId = id;
  }
  const action = {
    action: actionType,
    address,
  };
  return [action];
}

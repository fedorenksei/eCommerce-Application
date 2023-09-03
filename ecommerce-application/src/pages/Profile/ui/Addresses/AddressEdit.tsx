import { useForm } from 'react-hook-form';
import { TextInputGroup } from '../../../../shared/ui/forms/TextInputGroup';
import { customerRegExps } from '../../../../shared/data/regExps';
import { validationErrors } from '../../../../shared/data/validationErrors';
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
import { CheckboxGroup } from '../../../../shared/ui/forms/CheckboxGroup';
import { Header3 } from '../../../../shared/ui/text/Header3';

interface AddressEditProps {
  data: CustomerAddressWithId;
  toggleEditMode: () => void;
}

export const AddressEdit = ({ data, toggleEditMode }: AddressEditProps) => {
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
    const actions = getUpdateActions({ ...newData, id: data.id });
    const res = await serverAPI.updateCustomer(actions);
    console.log(res);
    setIsLoading(false);
    toggleEditMode();

    if (res) {
      dispatch(setIsShown({ isShown: true }));
      dispatch(
        setText({
          text: 'You have successfully updated your personal data',
        }),
      );
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <CheckboxGroup label="Choose the Country">
        <select
          {...register('country')}
          className="text-slate-900"
        >
          <option value="DE">Germany</option>
          <option value="IT">Italy</option>
        </select>
      </CheckboxGroup>

      <div className="form-bp:col-span-2">
        <Header3>Shipping address</Header3>
      </div>

      <TextInputGroup
        label="City"
        register={register('city', {
          required: {
            value: true,
            message: validationErrors.required,
          },
          pattern: {
            value: customerRegExps.city,
            message: validationErrors.city,
          },
        })}
        error={formState.errors?.city?.message}
      />

      <TextInputGroup
        label="Street"
        register={register('streetName', {
          required: {
            value: true,
            message: validationErrors.required,
          },
        })}
        error={formState.errors?.streetName?.message}
      />

      <TextInputGroup
        label="Postal code"
        register={register('postalCode', {
          required: {
            value: true,
            message: validationErrors.required,
          },
          pattern: {
            value: customerRegExps.postal,
            message: validationErrors.postalCode,
          },
        })}
        error={formState.errors?.postalCode?.message}
      />

      <div className="form-bp:col-span-2 justify-self-end">
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

function getUpdateActions(data: CustomerAddressWithId) {
  const actions: CustomerUpdateAction[] = [
    {
      action: 'changeAddress',
      addressId: data.id,
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

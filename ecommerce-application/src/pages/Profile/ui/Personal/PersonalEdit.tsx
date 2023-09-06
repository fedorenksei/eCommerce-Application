import { useForm } from 'react-hook-form';
import { TextInputGroup } from '../../../../shared/ui/forms/TextInputGroup';
import { customerRegExps } from '../../../../shared/data/regExps';
import { validationErrors } from '../../../../shared/data/validationErrors';
import { validateDate } from '../../../../shared/utils/helpers';
import { FormButton } from '../../../../shared/ui/forms/FormButton';
import { Form } from '../../../../shared/ui/forms/Form';
import { useState } from 'react';
import { ServerAPI } from '../../../../shared/api/ServerAPI';
import { PersonalData } from '../../../../shared/types/interfaces';
import { CustomerUpdateAction } from '../../../../shared/types/types';
import { useDispatch } from 'react-redux';
import { setIsShown, setText } from '../../../../shared/store/modalSlice';
import Spinner from '../../../../shared/ui/Spinner';

interface PersonalEditProps {
  data: PersonalData;
  toggleEditMode: () => void;
}

export const PersonalEdit = ({ data, toggleEditMode }: PersonalEditProps) => {
  const serverAPI = ServerAPI.getInstance();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<PersonalData>({
    defaultValues: data,
    mode: 'onChange',
  });

  const onSubmit = async (newData: PersonalData) => {
    setIsLoading(true);
    const res = await serverAPI.updateCustomer(getUpdateActions(newData));
    setIsLoading(false);
    toggleEditMode();

    dispatch(setIsShown({ isShown: true }));
    if (res) {
      dispatch(
        setText({
          text: 'You have successfully updated your personal data',
        }),
      );
    } else {
      dispatch(
        setText({
          text: 'Something went wrong, your personal data has not changed',
        }),
      );
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInputGroup
        label="First name"
        register={register('firstName', {
          required: {
            value: true,
            message: validationErrors.required,
          },
          pattern: {
            value: customerRegExps.name,
            message: validationErrors.name,
          },
        })}
        error={formState.errors?.firstName?.message}
      />

      <TextInputGroup
        label="Last name"
        register={register('lastName', {
          required: {
            value: true,
            message: validationErrors.required,
          },
          pattern: {
            value: customerRegExps.name,
            message: validationErrors.name,
          },
        })}
        error={formState.errors?.lastName?.message}
      />

      <TextInputGroup
        label="Email"
        register={register('email', {
          required: {
            value: true,
            message: 'Field is require',
          },
          pattern: {
            value: customerRegExps.mail,
            message: validationErrors.mail,
          },
        })}
        error={formState.errors?.email?.message}
      />

      <TextInputGroup
        label="Date of birth"
        register={register('dateOfBirth', {
          required: {
            value: true,
            message: validationErrors.required,
          },
          validate: validateDate,
        })}
        type="date"
        error={formState.errors?.dateOfBirth?.message}
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

function getUpdateActions(data: PersonalData) {
  const actions: CustomerUpdateAction[] = [
    {
      action: 'setFirstName',
      firstName: data.firstName,
    },
    {
      action: 'setLastName',
      lastName: data.lastName,
    },
    {
      action: 'changeEmail',
      email: data.email,
    },
    {
      action: 'setDateOfBirth',
      dateOfBirth: data.dateOfBirth,
    },
  ];
  return actions;
}

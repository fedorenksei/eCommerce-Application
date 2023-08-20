import React from 'react';
import { useForm } from 'react-hook-form';
import {
  CustomerInputData,
  FirstStepFormProps,
} from '../../../shared/types/interfaces';
import { TextInputGroup } from '../../../shared/ui/forms/TextInputGroup';
import { Form } from '../../../shared/ui/forms/Form';
import { FormButton } from '../../../shared/ui/forms/FormButton';

export const FirstStepForm = (props: FirstStepFormProps) => {
  const { register, handleSubmit, watch, trigger, formState } =
    useForm<CustomerInputData>({
      defaultValues: props.customerInfo,
      mode: 'onChange',
    });

  const validateDate = (value: string) => {
    const age =
      (new Date().getTime() - +new Date(value)) /
      (24 * 60 * 60 * 365.25 * 1000);
    if (age < 13) {
      return 'User should be above a 13 years';
    }
  };

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <TextInputGroup
        label="Email"
        register={register('email', {
          required: {
            value: true,
            message: 'Field is require',
          },
          pattern: {
            value:
              /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            message: 'Invalid email',
          },
        })}
        error={formState.errors?.email?.message}
      />

      <TextInputGroup
        label="Password"
        register={register('password', {
          onChange: async () => await trigger('passwordConfirm'),
          required: {
            value: true,
            message: 'Field is require',
          },
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (such as @$!%*?&)',
          },
        })}
        type="password"
        error={formState.errors?.password?.message}
      />

      <TextInputGroup
        label="Confirm password"
        register={register('passwordConfirm', {
          required: {
            value: true,
            message: 'Field is require',
          },
          validate: (val: string) => {
            if (watch('password') != val) {
              return 'Passwords is not the same';
            }
          },
        })}
        type="password"
        error={formState.errors?.passwordConfirm?.message}
      />

      <TextInputGroup
        label="First name"
        register={register('firstName', {
          required: {
            value: true,
            message: 'Field is require',
          },
          pattern: {
            value: /^[a-zA-Z]*$/,
            message:
              'Must contain at least one character and no special characters or numbers',
          },
        })}
        error={formState.errors?.firstName?.message}
      />

      <TextInputGroup
        label="Last name"
        register={register('lastName', {
          required: {
            value: true,
            message: 'Field is require',
          },
          pattern: {
            value: /^[a-zA-Z]*$/,
            message:
              'Must contain at least one character and no special characters or numbers',
          },
        })}
        error={formState.errors?.lastName?.message}
      />

      <TextInputGroup
        label="Date of birth"
        register={register('dateOfBirth', {
          required: {
            value: true,
            message: 'Field is require',
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
          Next step
        </FormButton>
      </div>
    </Form>
  );
};

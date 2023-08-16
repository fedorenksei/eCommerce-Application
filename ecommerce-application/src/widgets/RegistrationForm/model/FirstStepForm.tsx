import React from 'react';
import { useForm } from 'react-hook-form';
import {
  CustomerInputData,
  FirstStepFormProps,
} from '../../../shared/types/interfaces';

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
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="flex flex-col gap-10 items-center w-96 mx-auto"
    >
      <label className="flex justify-between w-full gap-3 relative">
        Email
        <input
          {...register('email', {
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
          type="text"
          className="text-blue-950"
        />
        {formState.errors?.email && (
          <div className="text-red-600 absolute top-0 left-full w-full mx-4">
            {formState.errors.email.message}
          </div>
        )}
      </label>
      <label className="flex justify-between w-full gap-3 relative">
        Password
        <input
          {...register('password', {
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
          className="text-blue-950"
        />
        {formState.errors?.password && (
          <div className="text-red-600 absolute top-0 left-full w-full mx-4">
            {formState.errors.password.message}
          </div>
        )}
      </label>
      <label className="flex justify-between w-full gap-3 relative">
        Confirm password
        <input
          {...register('passwordConfirm', {
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
          className="text-blue-950"
        />
        {formState.errors?.passwordConfirm && (
          <div className="text-red-600 absolute top-0 left-full w-full mx-4">
            {formState.errors.passwordConfirm.message}
          </div>
        )}
      </label>
      <label className="flex justify-between w-full gap-3 relative">
        First name
        <input
          {...register('firstName', {
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
          type="text"
          className="text-blue-950"
        />
        {formState.errors?.firstName && (
          <div className="text-red-600 absolute top-0 left-full w-full mx-4">
            {formState.errors.firstName.message}
          </div>
        )}
      </label>
      <label className="flex justify-between w-full gap-3 relative">
        Last name
        <input
          {...register('lastName', {
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
          type="text"
          className="text-blue-950"
        />
        {formState.errors?.lastName && (
          <div className="text-red-600 absolute top-0 left-full w-full mx-4">
            {formState.errors.lastName.message}
          </div>
        )}
      </label>
      <label className="flex justify-between w-full gap-3 relative">
        Date of birth
        <input
          {...register('dateOfBirth', {
            required: {
              value: true,
              message: 'Field is require',
            },
            validate: validateDate,
          })}
          type="date"
          className="text-blue-950"
        />
        {formState.errors?.dateOfBirth && (
          <div className="text-red-600 absolute top-0 left-full w-full mx-4">
            {formState.errors.dateOfBirth.message}
          </div>
        )}
      </label>
      <button
        disabled={!formState.isDirty || !formState.isValid}
        type="submit"
      >
        Next step
      </button>
    </form>
  );
};

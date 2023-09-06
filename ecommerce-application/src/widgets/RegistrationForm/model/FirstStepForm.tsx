import React from 'react';
import { useForm } from 'react-hook-form';
import {
  CustomerInputData,
  FirstStepFormProps,
} from '../../../shared/types/interfaces';
import { TextInputGroup } from '../../../shared/ui/forms/TextInputGroup';
import { Form } from '../../../shared/ui/forms/Form';
import { FormButton } from '../../../shared/ui/forms/FormButton';
import { customerRegExps } from '../../../shared/data/regExps';
import { validationErrors } from '../../../shared/data/validationErrors';
import { validateDate } from '../../../shared/utils/helpers';

export const FirstStepForm = (props: FirstStepFormProps) => {
  const { register, handleSubmit, watch, trigger, formState } =
    useForm<CustomerInputData>({
      defaultValues: props.customerInfo,
      mode: 'onChange',
    });

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
            value: customerRegExps.mail,
            message: validationErrors.mail,
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
            message: validationErrors.required,
          },
          pattern: {
            value: customerRegExps.password,
            message: validationErrors.password,
          },
          validate: (val: string) => {
            const trimmed = val.trim();
            if (trimmed.length !== val.length) {
              return validationErrors.passwordSpaces;
            }
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
            message: validationErrors.required,
          },
          validate: (val: string) => {
            if (watch('password') != val) {
              return validationErrors.passwordSame;
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
          Next step
        </FormButton>
      </div>
    </Form>
  );
};

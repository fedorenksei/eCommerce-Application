import { useDispatch } from 'react-redux';
import { ServerAPI } from '../../../../shared/api/ServerAPI';
import { Form } from '../../../../shared/ui/forms/Form';
import { TextInputGroup } from '../../../../shared/ui/forms/TextInputGroup';
import { useForm } from 'react-hook-form';
import { validationErrors } from '../../../../shared/data/validationErrors';
import { customerRegExps } from '../../../../shared/data/regExps';
import { FormButton } from '../../../../shared/ui/forms/FormButton';
import { useState } from 'react';
import Spinner from '../../../../shared/ui/Spinner';
import { setIsShown, setText } from '../../../../shared/store/modalSlice';

interface PasswordFormFields {
  password: '';
  passwordConfirm: '';
}

interface PasswordFormProps {
  closeForm: () => void;
}

export const PasswordForm = ({ closeForm }: PasswordFormProps) => {
  const dispatch = useDispatch();
  const serverAPI = ServerAPI.getInstance();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, trigger, formState } =
    useForm<PasswordFormFields>({
      mode: 'onChange',
    });

  const onSubmit = async ({ password }: PasswordFormFields) => {
    setIsLoading(true);
    const isOk = await serverAPI.resetPassword(password);
    dispatch(setIsShown({ isShown: true }));
    if (isOk) {
      dispatch(
        setText({
          text: 'You have successfully changed the password',
        }),
      );
    } else {
      dispatch(
        setText({
          text: 'Something went wrong, your password has not changed',
        }),
      );
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
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

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

interface PasswordConfirmFields {
  password: '';
}

interface PasswordConfirmProps {
  closeForm: () => void;
  onSuccess: () => void;
}

export const PasswordConfirm = ({
  closeForm,
  onSuccess,
}: PasswordConfirmProps) => {
  const dispatch = useDispatch();
  const serverAPI = ServerAPI.getInstance();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm<PasswordConfirmFields>({
    mode: 'onChange',
  });

  const onSubmit = async ({ password }: PasswordConfirmFields) => {
    setIsLoading(true);
    const isOk = await serverAPI.checkPassword(password);

    setIsLoading(false);
    dispatch(setIsShown({ isShown: true }));
    if (isOk) {
      onSuccess();
    } else {
      dispatch(
        setText({
          text: 'You have entered a wrong password',
        }),
      );
      closeForm();
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInputGroup
        label="Password"
        register={register('password', {
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
          Submit
        </FormButton>
      </div>
    </Form>
  );
};

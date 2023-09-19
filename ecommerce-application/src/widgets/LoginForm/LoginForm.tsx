import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ServerAPI } from '../../shared/api/ServerAPI';
import Spinner from '../../shared/ui/Spinner';
import { LoginData } from '../../shared/types/interfaces';
import { RootState } from '../../app/store';
import { Form } from '../../shared/ui/forms/Form';
import { TextInputGroup } from '../../shared/ui/forms/TextInputGroup';
import { FormButton } from '../../shared/ui/forms/FormButton';
import { Paragraph } from '../../shared/ui/text/Paragraph';
import { Header2 } from '../../shared/ui/text/Header2';
import { useDispatch } from 'react-redux';
import { setIsShown, setText } from '../../shared/store/modalSlice';
import { customerRegExps } from '../../shared/data/regExps';
import { validationErrors } from '../../shared/data/validationErrors';

export const LoginForm = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.isAuth) navigate('/', { replace: true });
  }, [navigate, auth]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const serverAPI = ServerAPI.getInstance();
  const { register, handleSubmit, formState, resetField } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (loginData: LoginData) => {
    setIsLoading(true);
    const res = await serverAPI.loginCustomer(loginData);
    setIsLoading(false);
    setIsError(!res);
    resetField('password');

    if (res) {
      dispatch(setIsShown({ isShown: true }));
      dispatch(
        setText({
          text: 'You are successfully logged in',
        }),
      );
      navigate('/');
    }
  };

  let elem = null;

  const form = (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextInputGroup
        label="Email"
        register={register('email', {
          required: {
            value: true,
            message: validationErrors.required,
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

      <div className="form-bp:col-span-2 justify-self-center">
        <FormButton
          disabled={!formState.isDirty || !formState.isValid}
          type="submit"
        >
          Log in
        </FormButton>
      </div>
    </Form>
  );

  if (isLoading) {
    elem = (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else if (isError) {
    elem = (
      <div className="flex flex-col items-center mx-auto gap-5">
        <Paragraph>No user found with this username and password</Paragraph>
        <FormButton
          type="button"
          secondary={true}
          onClick={() => {
            setIsError(false);
          }}
        >
          Try again
        </FormButton>
      </div>
    );
  } else {
    elem = form;
  }

  return (
    <div className="form-bp:p-10 p-5 flex flex-col gap-10 items-center">
      <Header2>Welcome back!</Header2>

      {elem}

      <Paragraph>
        Don&apos;t have an account?&nbsp;
        <Link
          className="text-primary-color hover:underline"
          to={'/registration'}
        >
          Sign up!
        </Link>
      </Paragraph>
    </div>
  );
};

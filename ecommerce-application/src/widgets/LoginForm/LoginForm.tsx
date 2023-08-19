import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ServerAPI } from '../../shared/api/ServerAPI';
import Spinner from '../../shared/ui/Spinner';
import { LoginData } from '../../shared/types/interfaces';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
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

    if (res) navigate('/');
  };

  let elem = null;

  const form = (
    <form
      className="flex flex-col gap-10 items-center w-96 mx-auto"
      onSubmit={handleSubmit(onSubmit)}
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
            required: {
              value: true,
              message: 'Field is require',
            },
            /* pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (such as @$!%*?&)',
            }, */
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
      <button
        disabled={!formState.isDirty || !formState.isValid}
        type="submit"
      >
        Login
      </button>
    </form>
  );

  if (isLoading) {
    elem = (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else if (isError) {
    elem = (
      <div className="flex flex-col mx-auto">
        <span>No user found with this username and password</span>
        <button
          className="bg-white text-slate-800"
          onClick={() => {
            setIsError(false);
          }}
        >
          To form
        </button>
      </div>
    );
  } else {
    elem = form;
  }

  return <div className="bg-slate-800 p-10 text-white">{elem}</div>;
};

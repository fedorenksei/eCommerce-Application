import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ICustomer {
  email: string;
  /* password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; */
}

export const Registration = () => {
  const { register, handleSubmit, formState } = useForm<ICustomer>();

  const onSubmit: SubmitHandler<ICustomer> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="bg-slate-800 p-10 text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
                message: 'invalid email',
              },
            })}
            type="email"
            className="text-blue-950"
          />
          {formState.errors?.email && (
            <div className="text-red-600 absolute top-0 left-full w-full mx-4">
              {formState.errors.email.message}
            </div>
          )}
        </label>
        <button
          disabled={formState.errors ? true : false}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

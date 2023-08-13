import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IAddress {
  country: 'DE' | 'US';
  shippingCity: string;
  shippingStreet: string;
  shippingCode: string;
  shippingIsDefault?: boolean;
  billingCity?: string;
  billingStreet?: string;
  billingCode?: string;
  billingIsDefault?: boolean;
}

export const SecondStepForm = (props: IAddress) => {
  const { register, handleSubmit, trigger, formState } = useForm<IAddress>({
    defaultValues: props,
    mode: 'onChange',
  });

  const [isAddressSame, setIsAddressSame] = useState(false);

  const onSubmit: SubmitHandler<IAddress> = (data) => {
    alert(JSON.stringify(data));
  };

  console.log(formState);

  return (
    <div className="bg-slate-800 p-10 text-white">
      <form
        id="addressform"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 items-center w-96 mx-auto"
      >
        <label className="flex justify-between w-full gap-3 relative">
          Country
          <select
            name="user_profile_color_1"
            form="addressform"
            className="text-slate-900"
          >
            <option value="US">United States</option>
            <option value="DE">Germany</option>
          </select>
          {formState.errors?.country && (
            <div className="text-red-600 absolute top-0 left-full w-full mx-4">
              {formState.errors.country.message}
            </div>
          )}
        </label>
        <div className="flex flex-col gap-10 items-center w-96 mx-auto">
          <h3>Shipping address</h3>
          <label className="flex justify-between w-full gap-3 relative">
            City
            <input
              {...register('shippingCity', {
                required: {
                  value: true,
                  message: 'Field is require',
                },
              })}
              type="text"
              className="text-blue-950"
            />
            {formState.errors?.shippingCity && (
              <div className="text-red-600 absolute top-0 left-full w-full mx-4">
                {formState.errors.shippingCity.message}
              </div>
            )}
          </label>
          <label className="flex justify-between w-full gap-3 relative">
            Street
            <input
              {...register('shippingStreet', {
                onChange: async () => await trigger('shippingStreet'),
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
            {formState.errors?.shippingStreet && (
              <div className="text-red-600 absolute top-0 left-full w-full mx-4">
                {formState.errors.shippingStreet.message}
              </div>
            )}
          </label>
          <label className="flex justify-between w-full gap-3 relative">
            Postal code
            <input
              {...register('shippingCode', {
                required: {
                  value: true,
                  message: 'Field is require',
                },
              })}
              type="text"
              className="text-blue-950"
            />
            {formState.errors?.shippingCode && (
              <div className="text-red-600 absolute top-0 left-full w-full mx-4">
                {formState.errors.shippingCode.message}
              </div>
            )}
          </label>
          <label className="flex justify-between w-full gap-3 relative">
            Set address as default
            <input
              {...register('shippingIsDefault', {})}
              type="checkbox"
              className="text-blue-950"
            />
            {formState.errors?.shippingIsDefault && (
              <div className="text-red-600 absolute top-0 left-full w-full mx-4">
                {formState.errors.shippingIsDefault.message}
              </div>
            )}
          </label>
        </div>

        <div>
          <input
            type="checkbox"
            checked={isAddressSame}
            onChange={() => setIsAddressSame((state) => !state)}
          />
          <span>My billing and shipping address is the same</span>
        </div>

        {!isAddressSame && (
          <div className="flex flex-col gap-10 items-center w-96 mx-auto">
            <h3>Billing address</h3>
            <label className="flex justify-between w-full gap-3 relative">
              City
              <input
                {...register('billingCity', {
                  required: {
                    value: true,
                    message: 'Field is require',
                  },
                })}
                type="text"
                className="text-blue-950"
              />
              {formState.errors?.billingCity && (
                <div className="text-red-600 absolute top-0 left-full w-full mx-4">
                  {formState.errors.billingCity.message}
                </div>
              )}
            </label>
            <label className="flex justify-between w-full gap-3 relative">
              Street
              <input
                {...register('billingStreet', {
                  onChange: async () => await trigger('billingStreet'),
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
              {formState.errors?.billingStreet && (
                <div className="text-red-600 absolute top-0 left-full w-full mx-4">
                  {formState.errors.billingStreet.message}
                </div>
              )}
            </label>
            <label className="flex justify-between w-full gap-3 relative">
              Postal code
              <input
                {...register('billingCode', {
                  required: {
                    value: true,
                    message: 'Field is require',
                  },
                })}
                type="text"
                className="text-blue-950"
              />
              {formState.errors?.billingCode && (
                <div className="text-red-600 absolute top-0 left-full w-full mx-4">
                  {formState.errors.billingCode.message}
                </div>
              )}
            </label>
            <label className="flex justify-between w-full gap-3 relative">
              Set address as default
              <input
                {...register('billingIsDefault', {})}
                type="checkbox"
                className="text-blue-950"
              />
              {formState.errors?.billingIsDefault && (
                <div className="text-red-600 absolute top-0 left-full w-full mx-4">
                  {formState.errors.billingIsDefault.message}
                </div>
              )}
            </label>
          </div>
        )}

        <button
          disabled={!formState.isDirty || !formState.isValid}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

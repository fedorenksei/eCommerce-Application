import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IAddress, ISecondStepForm } from '../types/interfaces';

export const SecondStepForm = (props: ISecondStepForm) => {
  const { register, handleSubmit, formState, trigger } = useForm<IAddress>({
    defaultValues: props.customerAddres,
    mode: 'onChange',
  });

  const [isAddressSame, setIsAddressSame] = useState(false);

  const toggleIsAddressSame = () => {
    setIsAddressSame((state) => !state);
    trigger();
  };

  return (
    <form
      id="addressform"
      onSubmit={handleSubmit(props.onSubmit)}
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
              pattern: {
                value: /^[a-zA-Z]*$/,
                message:
                  'Must contain at least one character and no special characters or numbers',
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
              required: {
                value: true,
                message: 'Field is require',
              },
            })}
            type="text"
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
              pattern: {
                value: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                message: 'Code format should be like 54321 or 12345-1234',
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

      <div className="w-full flex flex-row-reverse justify-between">
        <input
          type="checkbox"
          checked={isAddressSame}
          onChange={toggleIsAddressSame}
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
                pattern: {
                  value: /^[a-zA-Z]*$/,
                  message:
                    'Must contain at least one character and no special characters or numbers',
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
                required: {
                  value: true,
                  message: 'Field is require',
                },
              })}
              type="text"
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
                pattern: {
                  value: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                  message: 'Code format should be like 12345-1234',
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
  );
};

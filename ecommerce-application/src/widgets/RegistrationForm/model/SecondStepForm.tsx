import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CustomerInputAddress,
  SecondStepProps,
} from '../../../shared/types/interfaces';
import { Form } from '../../../shared/ui/forms/Form';
import { Header3 } from '../../../shared/ui/text/Header3';
import { TextInputGroup } from '../../../shared/ui/forms/TextInputGroup';
import { FormButton } from '../../../shared/ui/forms/FormButton';
import { CheckboxGroup } from '../../../shared/ui/forms/CheckboxGroup';

export const SecondStepForm = (props: SecondStepProps) => {
  const { register, handleSubmit, formState, trigger } =
    useForm<CustomerInputAddress>({
      defaultValues: props.customerAddress,
      mode: 'onChange',
    });

  const [isAddressSame, setIsAddressSame] = useState(false);

  const toggleIsAddressSame = () => {
    setIsAddressSame((state) => !state);
    trigger();
  };

  return (
    <Form
      id="addressform"
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <CheckboxGroup label="Choose the Country">
        <select
          name="user_profile_color_1"
          form="addressform"
          className="text-slate-900"
        >
          <option value="DE">Germany</option>
          <option value="IT">Italy</option>
        </select>
      </CheckboxGroup>

      <div className="form-bp:col-span-2">
        <Header3>Shipping address</Header3>
      </div>

      <TextInputGroup
        label="City"
        register={register('shippingCity', {
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
        error={formState.errors?.shippingCity?.message}
      />

      <TextInputGroup
        label="Street"
        register={register('shippingStreet', {
          required: {
            value: true,
            message: 'Field is require',
          },
        })}
        error={formState.errors?.shippingStreet?.message}
      />

      <TextInputGroup
        label="Postal code"
        register={register('shippingCode', {
          required: {
            value: true,
            message: 'Field is require',
          },
          pattern: {
            value: /(^\d{5}$)/,
            message: 'Code format should be like 54321',
          },
        })}
        error={formState.errors?.shippingCode?.message}
      />

      <CheckboxGroup
        label="Set address as default"
        error={formState.errors?.shippingIsDefault?.message}
      >
        <input
          type="checkbox"
          {...register('shippingIsDefault', {})}
        />
      </CheckboxGroup>

      <CheckboxGroup label="My billing and shipping address is the same">
        <input
          type="checkbox"
          checked={isAddressSame}
          onChange={toggleIsAddressSame}
        />
      </CheckboxGroup>

      {!isAddressSame && (
        <>
          <div className="form-bp:col-span-2">
            <Header3>Billing address</Header3>
          </div>

          <TextInputGroup
            label="City"
            register={register('billingCity', {
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
            error={formState.errors?.billingCity?.message}
          />

          <TextInputGroup
            label="Street"
            register={register('billingStreet', {
              required: {
                value: true,
                message: 'Field is require',
              },
            })}
            error={formState.errors?.billingStreet?.message}
          />

          <TextInputGroup
            label="Postal code"
            register={register('billingCode', {
              required: {
                value: true,
                message: 'Field is require',
              },
              pattern: {
                value: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                message: 'Code format should be like 12345-1234',
              },
            })}
            error={formState.errors?.billingCode?.message}
          />

          <CheckboxGroup
            label="Set address as default"
            error={formState.errors?.billingIsDefault?.message}
          >
            <input
              type="checkbox"
              {...register('billingIsDefault', {})}
            />
          </CheckboxGroup>
        </>
      )}

      <div className="form-bp:col-span-2 flex justify-between w-full">
        <FormButton
          type="button"
          onClick={() => props.onBackClick()}
          secondary={true}
        >
          Prev step
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

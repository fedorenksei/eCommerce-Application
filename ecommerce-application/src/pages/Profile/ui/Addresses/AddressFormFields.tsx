import { UseFormRegister, UseFormStateReturn } from 'react-hook-form';
import { customerRegExps } from '../../../../shared/data/regExps';
import { validationErrors } from '../../../../shared/data/validationErrors';
import { CheckboxGroup } from '../../../../shared/ui/forms/CheckboxGroup';
import { TextInputGroup } from '../../../../shared/ui/forms/TextInputGroup';
import { CustomerAddress } from '../../../../shared/types/interfaces';

interface FormFieldsProps {
  register: UseFormRegister<CustomerAddress>;
  formState: UseFormStateReturn<CustomerAddress>;
}

export const AddressFormFields = ({ register, formState }: FormFieldsProps) => {
  return (
    <>
      <CheckboxGroup label="Choose the Country">
        <select
          {...register('country')}
          className="text-slate-900"
        >
          <option value="DE">Germany</option>
          <option value="IT">Italy</option>
        </select>
      </CheckboxGroup>

      <TextInputGroup
        label="City"
        register={register('city', {
          required: {
            value: true,
            message: validationErrors.required,
          },
          pattern: {
            value: customerRegExps.city,
            message: validationErrors.city,
          },
        })}
        error={formState.errors?.city?.message}
      />

      <TextInputGroup
        label="Street"
        register={register('streetName', {
          required: {
            value: true,
            message: validationErrors.required,
          },
        })}
        error={formState.errors?.streetName?.message}
      />

      <TextInputGroup
        label="Postal code"
        register={register('postalCode', {
          required: {
            value: true,
            message: validationErrors.required,
          },
          pattern: {
            value: customerRegExps.postal,
            message: validationErrors.postalCode,
          },
        })}
        error={formState.errors?.postalCode?.message}
      />
    </>
  );
};

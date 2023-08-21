import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirstStepForm } from './model/FirstStepForm';
import { SecondStepForm } from './model/SecondStepForm';
import { useDoubleStepForm } from './hooks/useDoubleStepForm';
import { Countries } from '../../shared/types/enums';
import {
  CustomerInputAddress,
  CustomerInputData,
  NewCustomerInfo,
} from '../../shared/types/interfaces';
import { newCustomerTransformInfo } from '../../shared/utils/newCustomerInfoTransformer';
import { ServerAPI } from '../../shared/api/ServerAPI';
import Spinner from '../../shared/ui/Spinner';
import { Header2 } from '../../shared/ui/text/Header2';
import { Paragraph } from '../../shared/ui/text/Paragraph';
import { FormButton } from '../../shared/ui/forms/FormButton';

export const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const serverAPI = ServerAPI.getInstance();
  const defaultCustomerInfo = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  };

  const [customerInfo, setCustomerInfo] = useState(defaultCustomerInfo);

  let customerAddress: CustomerInputAddress = {
    country: Countries.DE,
    shippingCity: '',
    shippingStreet: '',
    shippingCode: '',
    shippingIsDefault: false,
    isBillingAddressTheSame: false,
    billingCity: '',
    billingStreet: '',
    billingCode: '',
    billingIsDefault: false,
  };

  const finishForm = async () => {
    const newCustomerData: NewCustomerInfo = newCustomerTransformInfo(
      customerInfo,
      customerAddress,
    );

    setIsLoading(true);
    const res = await serverAPI.createNewCustomer(newCustomerData);
    console.log(res);
    setIsLoading(false);
    setIsError(!res);

    if (res) navigate('/');
  };

  const firstStepOnSubmit = (currCustomerInfo: CustomerInputData) => {
    setCustomerInfo({ ...currCustomerInfo });
    nextStep();
  };

  const secondStepOnBackClick = () => {
    setCustomerInfo((customerInfo) => {
      return { ...customerInfo, passwordConfirm: '' };
    });
    prevStep();
  };

  const secondStepOnSubmit = (currCustomerAddress: CustomerInputAddress) => {
    customerAddress = { ...currCustomerAddress };
    finishForm();
    setCustomerInfo((customerInfo) => {
      return { ...customerInfo, email: '' };
    });
  };

  const steps = [
    <FirstStepForm
      onSubmit={firstStepOnSubmit}
      customerInfo={customerInfo}
      key={'1'}
    />,
    <SecondStepForm
      onSubmit={secondStepOnSubmit}
      onBackClick={secondStepOnBackClick}
      customerAddress={customerAddress}
      key={'2'}
    />,
  ];

  const { currStepElem, nextStep, prevStep } = useDoubleStepForm(steps);

  let elem = null;
  if (isLoading) {
    elem = (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else if (isError) {
    elem = (
      <div className="flex flex-col items-center mx-auto gap-5">
        <Paragraph>User already exist</Paragraph>
        <FormButton
          type="button"
          secondary={true}
          onClick={() => {
            setIsError(false);
            prevStep();
          }}
        >
          Try again
        </FormButton>
      </div>
    );
  } else {
    elem = currStepElem;
  }

  return (
    <div className="form-bp:p-10 p-5 flex flex-col gap-10 items-center">
      <Header2>Registration</Header2>

      {elem}

      <Paragraph>
        Already have an account?&nbsp;
        <Link
          className="text-primary-color hover:underline"
          to={'/login'}
        >
          Sign in!
        </Link>
      </Paragraph>
    </div>
  );
};

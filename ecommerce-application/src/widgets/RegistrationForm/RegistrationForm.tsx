import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    country: Countries.US,
    shippingCity: '',
    shippingStreet: '',
    shippingCode: '',
    shippingIsDefault: false,
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
      <div className="flex flex-col mx-auto">
        <span>User already exist</span>
        <button
          className="bg-bg-color"
          onClick={() => {
            setIsError(false);
            prevStep();
          }}
        >
          To form
        </button>
      </div>
    );
  } else {
    elem = currStepElem;
  }

  return <div className="form-bp:p-10 p-5">{elem}</div>;
};

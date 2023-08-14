import React, { useState } from 'react';
import { FirstStepForm } from './model/FirstStepForm';
import { SecondStepForm } from './model/SecondStepForm';
import { useDoubleStepForm } from './hooks/useDoubleStepForm';
import { Countries } from '../../shared/types/enums';
import {
  IAddress,
  ICustomer,
  INewCustomerInfo,
} from '../../shared/types/interfaces';
import { newCustomerTransformInfo } from '../../shared/utils/newCustomerInfoTransformer';
import { ServerAPI } from '../../shared/api/ServerAPI';

export const Registration = () => {
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

  let customerAddress: IAddress = {
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

  const mockCreateUser = () => {
    const newCustomerData: INewCustomerInfo = newCustomerTransformInfo(
      customerInfo,
      customerAddress
    );

    serverAPI.createNewCustomer(newCustomerData);
  };

  const firstStepOnSubmit = (currCustomerInfo: ICustomer) => {
    setCustomerInfo({ ...currCustomerInfo });
    nextStep();
    console.log(customerInfo);
  };

  const secondStepOnSubmit = (currCustomerAddress: IAddress) => {
    console.log(customerInfo);
    customerAddress = { ...currCustomerAddress };
    mockCreateUser();
  };

  const steps = [
    <FirstStepForm
      onSubmit={firstStepOnSubmit}
      customerInfo={customerInfo}
      key={'1'}
    />,
    <SecondStepForm
      onSubmit={secondStepOnSubmit}
      customerAddres={customerAddress}
      key={'2'}
    />,
  ];

  const { currStepElem, nextStep } = useDoubleStepForm(steps);

  return <div className="bg-slate-800 p-10 text-white">{currStepElem}</div>;
};

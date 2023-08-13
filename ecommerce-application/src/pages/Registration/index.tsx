import React from 'react';
// import { FirstStepForm } from './model/FirstStepForm';
import { SecondStepForm } from './model/SecondStepForm';

export const Registration = () => {
  return (
    <div className="bg-slate-800 p-10 text-white">
      {/* <FirstStepForm
        email=""
        password=""
        passwordConfirm=""
        firstName=""
        lastName=""
        dateOfBirth=""
      /> */}
      <SecondStepForm
        country="US"
        shippingCity=""
        shippingCode=""
        shippingStreet=""
      />
    </div>
  );
};

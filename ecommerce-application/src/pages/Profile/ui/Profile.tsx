import React from 'react';
import { Header2 } from '../../../shared/ui/text/Header2';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Paragraph } from '../../../shared/ui/text/Paragraph';
import { CustomerData } from '../../../shared/types/interfaces';
import { Personal } from './Personal';
import { Addresses } from './Addresses';

export const Profile = () => {
  const customerData: null | CustomerData = useSelector(
    (state: RootState) => state.customerData,
  ).customerData;

  return (
    <div className="flex flex-col p-10 gap-10 text-center">
      <Header2>Your profile</Header2>
      {customerData ? (
        <>
          <Personal {...(customerData as CustomerData)} />
          <Addresses {...(customerData as CustomerData)} />
        </>
      ) : (
        <Paragraph>Log in please</Paragraph>
      )}
    </div>
  );
};

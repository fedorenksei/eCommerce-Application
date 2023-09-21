import React, { useEffect } from 'react';
import { Header2 } from '../../../shared/ui/text/Header2';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { CustomerData } from '../../../shared/types/interfaces';
import { Personal } from './Personal';
import { Addresses } from './Addresses';
import { Password } from './Password';
import { Header5 } from '../../../shared/ui/text/Header5';
import { Link, useNavigate } from 'react-router-dom';
import { getButtonStyles } from '../../../shared/ui/styles';

export const Profile = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isAuth) navigate('/login', { replace: true });
  }, [navigate, auth]);

  const customerData: null | CustomerData = useSelector(
    (state: RootState) => state.customerData,
  ).customerData;

  return (
    <div className="flex flex-col p-10 gap-10 text-center">
      <Header2>Your profile</Header2>
      {customerData ? (
        <>
          <Personal {...(customerData as CustomerData)} />
          <Password />
          <Addresses {...(customerData as CustomerData)} />
        </>
      ) : (
        <>
          <Header5>Log in please</Header5>
          <Link to={`/login`}>
            <button
              type="button"
              className={getButtonStyles({
                size: 'medium',
                filling: 'filled',
                shape: 'round',
              })}
            >
              Log in
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

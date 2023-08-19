import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Main } from '../../pages/Main';
import { Registration } from '../../pages/Registration';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { ServerAPI } from '../../shared/api/ServerAPI';
import { CustomerData } from '../../shared/types/interfaces';

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const customerData = useSelector((state: RootState) => state.customerData);
  const serverAPI = ServerAPI.getInstance();

  return (
    <>
      <header className="shadow-md bg-color flex justify-between items-center px-2">
        <div className="flex items-center">
          <div className="flex justify-center items-center">
            <img
              className="w-14 object-cover"
              src="./public/images/logo.png"
              alt="bike logo"
            />
          </div>
          <div className="text-text-color text-2xl font-bold">BI-KU-KLE</div>
        </div>
        <ul className="flex py-6 gap-4">
          <li className="text-center text-second-text-color text-sm font-bold hover:text-primary-color hover:underline">
            <Link to="/">Main</Link>
          </li>
          {!auth.isAuth && (
            <li className="text-center text-second-text-color text-sm font-bold hover:text-primary-color hover:underline">
              <Link to="/login">Login</Link>
            </li>
          )}
          {!auth.isAuth && (
            <li className="text-center text-second-text-color text-sm font-bold hover:text-primary-color hover:underline">
              <Link to="/registration">Registration</Link>
            </li>
          )}
          {auth.isAuth && (
            <li className="text-center text-second-text-color text-sm font-bold hover:text-primary-color">
              <button onClick={() => serverAPI.logout()}>
                <span className="hover:underline">Logout</span>
              </button>
            </li>
          )}
        </ul>
        {customerData.customerData && (
          <span className="text-center text-primary-color text-base font-bold">
            {(customerData.customerData as CustomerData).email}
          </span>
        )}
      </header>
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/registration"
          element={<Registration />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Main } from '../../pages/Main';
import { Registration } from '../../pages/Registration';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';
import { ServerAPI } from '../../shared/api/ServerAPI';

export const Header = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const customerData = useSelector((state: RootState) => state.customerData);
  const serverAPI = ServerAPI.getInstance();

  return (
    <>
      <header>
        <ul className="flex py-6 justify-around">
          <li>
            <Link to="/">Main</Link>
          </li>
          {!auth.isAuth && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {!auth.isAuth && (
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          )}
          {auth.isAuth && (
            <li>
              <button onClick={() => serverAPI.logout()}>Logout</button>
            </li>
          )}
        </ul>
      </header>
      {<div>Is user login: {String(auth.isAuth)}</div>}
      {customerData.customerData && (
        <div>{JSON.stringify(customerData.customerData)}</div>
      )}
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

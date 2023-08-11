import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Main } from '../../pages/Main';
import { Registration } from '../../pages/Registration';
import { Login } from '../../pages/Login';
import { NotFound } from '../../pages/NotFound';

export const Header = () => {
  return (
    <>
      <header>
        <ul className="flex py-6 justify-around">
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        </ul>
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

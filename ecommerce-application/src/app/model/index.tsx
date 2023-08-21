import React from 'react';
import { Header } from '../../widgets/Header';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../../pages/Main';
import { Login } from '../../pages/Login';
import { Registration } from '../../pages/Registration';
import { NotFound } from '../../pages/NotFound';

export const AppComponent = () => {
  return (
    <>
      <Header />
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

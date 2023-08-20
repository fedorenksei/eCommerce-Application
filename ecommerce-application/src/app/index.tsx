import React from 'react';
import { Header } from '../widgets/Header';
import { withProviders } from './providers';
import { ServerAPI } from '../shared/api/ServerAPI';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Login } from '../pages/Login';
import { Registration } from '../pages/Registration';
import { NotFound } from '../pages/NotFound';

const AppComponent = () => {
  const serverAPI = ServerAPI.getInstance();
  serverAPI.preflight();
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

export const App = withProviders(<AppComponent />);

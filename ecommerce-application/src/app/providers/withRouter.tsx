import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../../pages/Main';
import { Login } from '../../pages/Login';
import { Registration } from '../../pages/Registration';
import { NotFound } from '../../pages/NotFound';
import { AboutUs } from '../../pages/AboutUs';
import { Basket } from '../../pages/Basket';
import { Profile } from '../../pages/Profile';
import { Catalog } from '../../pages/Catalog';

export const withRouter = (component: JSX.Element) => (
  <BrowserRouter /* basename="/ecommerce-deploy" */>
    <>{component}</>
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
        path="/about-us"
        element={<AboutUs />}
      />
      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/catalog"
        element={<Catalog />}
      />
      <Route
        path="/basket"
        element={<Basket />}
      />
      <Route
        path="/*"
        element={<NotFound />}
      />
    </Routes>
  </BrowserRouter>
);

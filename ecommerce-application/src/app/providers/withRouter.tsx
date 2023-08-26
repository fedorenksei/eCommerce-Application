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

const routePairs = [
  {
    path: '/',
    component: <Main />,
  },
  {
    path: '/login',
    component: <Login />,
  },
  {
    path: '/registration',
    component: <Registration />,
  },
  {
    path: '/about-us',
    component: <AboutUs />,
  },
  {
    path: '/profile',
    component: <Profile />,
  },
  {
    path: '/catalog',
    component: <Catalog />,
  },
  {
    path: '/basket',
    component: <Basket />,
  },
  {
    path: '/*',
    component: <NotFound />,
  },
];

export const withRouter = (component: JSX.Element) => (
  <BrowserRouter /* basename="/ecommerce-deploy" */>
    <>{component}</>
    <Routes>
      {routePairs.map(({ path, component }) => {
        return (
          <Route
            path={path}
            element={component}
            key={path}
          />
        );
      })}
    </Routes>
  </BrowserRouter>
);

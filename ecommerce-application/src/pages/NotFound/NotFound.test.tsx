import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NotFound } from '.';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { AppComponent } from '../../app/model';
import { userEvent } from '@storybook/testing-library';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../Main';
import { Login } from '../Login';
import { Registration } from '../Registration';

type Props = {
  children?: React.ReactNode;
};

test('Component just rendering', async () => {
  const AllTheProviders = ({ children }: Props) => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
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
        </BrowserRouter>
      </Provider>
    );
  };
  render(<NotFound />, { wrapper: AllTheProviders });

  expect(screen.getByText('Not found')).toBeInTheDocument();
  expect(screen.getByText('Go home')).toBeInTheDocument();
});

test('There is a button for back to main', async () => {
  const badRoute = '/verywronglink';

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[badRoute]}>
        <AppComponent />
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
      </MemoryRouter>
    </Provider>,
  );

  await userEvent.click(screen.getByText('Go home'));

  expect(screen.getByText('Main page')).toBeInTheDocument();
});

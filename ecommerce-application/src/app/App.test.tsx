import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { AppComponent } from './model';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../pages/Main';
import { Login } from '../pages/Login';
import { Registration } from '../pages/Registration';
import { NotFound } from '../pages/NotFound';

/* type Props = {
  children?: React.ReactNode;
}; */

test('component just rendering', async () => {
  /* const AllTheProviders = ({ children }: Props) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }; */
  // render(<AppComponent />, { wrapper: AllTheProviders });
  render(
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>,
  );

  expect(screen.getByText('Main page')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Login'));
  expect(screen.getByText('Log in')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Registration'));
  expect(screen.getAllByText('Registration').length).toBeGreaterThan(1);
});

test('landing bad page', async () => {
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

  expect(screen.getByText('Not found')).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { AppComponent } from './model';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { App } from '.';
test('component just rendering and routing works fine', async () => {
  render(App);

  expect(screen.getByText('Main page')).toBeInTheDocument();

  await userEvent.click(screen.getAllByText('Log in')[0]);
  expect(screen.getByText('Welcome back!')).toBeInTheDocument();

  await userEvent.click(screen.getByTitle('Sign up'));
  expect(screen.getByText('Registration')).toBeInTheDocument();

  await userEvent.click(screen.getByText('BI-KU-KLE'));
  await userEvent.click(screen.getByText('Profile'));
  expect(screen.getByText('Welcome back!')).toBeInTheDocument();

  await userEvent.click(screen.getByText('BI-KU-KLE'));
  await userEvent.click(screen.getByText('Basket'));
  expect(screen.getByText('Your cart')).toBeInTheDocument();
});

test('landing bad page', async () => {
  const badRoute = '/verywronglink';

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[badRoute]}>
        <AppComponent />
        <Routes>
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

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AppComponent } from './model';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
/* import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'; */
import { Provider } from 'react-redux';
import store from './store';

type Props = {
  children?: React.ReactNode;
};

test('component just rendering', async () => {
  const AllTheProviders = ({ children }: Props) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  render(<AppComponent />, { wrapper: AllTheProviders });

  expect(screen.getByText('Main page')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Login'));
  expect(screen.getByText('Login page')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Registration'));
  expect(screen.getByText('Email')).toBeInTheDocument();
});

test('landing bad page', async () => {
  const badRoute = '/verywronglink';

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[badRoute]}>
        <AppComponent />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByText('Not found')).toBeInTheDocument();
});

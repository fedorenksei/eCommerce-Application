import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { AppComponent } from './model';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

test('component just rendering', async () => {
  render(<AppComponent />, { wrapper: BrowserRouter });

  expect(screen.getByText('Main page')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Login'));
  expect(screen.getByText('Login page')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Registration'));
  expect(screen.getByText('Email')).toBeInTheDocument();
});

test('landing bad page', async () => {
  const badRoute = '/verywronglink';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <AppComponent />
    </MemoryRouter>,
  );

  expect(screen.getByText('Not found')).toBeInTheDocument();
});

import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { NotFound } from '.';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppComponent } from '../../app/model';

test('Component just rendering', async () => {
  render(<NotFound />, { wrapper: BrowserRouter });

  expect(screen.getByText('Not found')).toBeInTheDocument();
  expect(screen.getByText('Go home')).toBeInTheDocument();
});

test('There is a button for back to main', async () => {
  const badRoute = '/verywronglink';

  render(
    <MemoryRouter initialEntries={[badRoute]}>
      <AppComponent />
    </MemoryRouter>,
  );

  await userEvent.click(screen.getByText('Go home'));

  expect(screen.getByText('Main page')).toBeInTheDocument();
});

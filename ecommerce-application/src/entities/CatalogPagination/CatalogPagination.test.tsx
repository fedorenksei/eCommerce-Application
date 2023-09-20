import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CatalogPagination } from '.';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('Pagination render fine', () => {
  render(
    <BrowserRouter>
      <CatalogPagination totalProducts={100} />
    </BrowserRouter>,
  );
  expect(screen.getByText('<<')).toBeInTheDocument();
});

test('Pagination change pages fine', async () => {
  render(
    <BrowserRouter>
      <CatalogPagination totalProducts={90} />
    </BrowserRouter>,
  );
  for (let i = 0; i < 10; i++) {
    await userEvent.click(screen.getByText('>>'));
  }
  expect(screen.getByText('10')).toBeInTheDocument();
  for (let i = 0; i < 5; i++) {
    await userEvent.click(screen.getByText('<<'));
  }
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('On the first page prev btn disabled', () => {
  render(
    <BrowserRouter>
      <CatalogPagination totalProducts={1} />
    </BrowserRouter>,
  );
  expect(screen.getByText('<<').closest('button')).toBeDisabled();
});

test('On the last page prev btn disabled', async () => {
  render(
    <BrowserRouter>
      <CatalogPagination totalProducts={11} />
    </BrowserRouter>,
  );

  await userEvent.click(screen.getByText('>>'));
  expect(screen.getByText('>>').closest('button')).toBeDisabled();
});

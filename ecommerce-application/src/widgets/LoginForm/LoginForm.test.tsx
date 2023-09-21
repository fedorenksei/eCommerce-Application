import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { App } from '../../app';
import { validationErrors } from '../../shared/data/validationErrors';

const rightEmail = 'uac@mail.ru';
const rightPassword = 'asdASD123&';
const wrongEmail = 'uac@';
const wrongPassword = 'asdA';

test('component just rendering', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Log in'));
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
  expect(screen.getByText('Welcome back!')).toBeInTheDocument();
});

test('Next step button disabled on initial step', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Log in'));
  expect(
    screen.getByText('Log in', { selector: 'button[type="submit"]' }),
  ).toBeDisabled();
});

test('There is clear error messages on wrong input', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Log in'));

  await userEvent.type(screen.getByLabelText('Password'), wrongPassword);
  expect(screen.getByText(validationErrors.password)).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText('Email'), wrongEmail);
  expect(screen.getByText(validationErrors.mail)).toBeInTheDocument();
});

test('Button enabled after good input', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Log in'));

  await userEvent.type(screen.getByLabelText('Email'), rightEmail);

  await userEvent.type(screen.getByLabelText('Password'), rightPassword);
  expect(
    screen.getByText('Log in', { selector: 'button[type="submit"]' }),
  ).toBeEnabled();
});

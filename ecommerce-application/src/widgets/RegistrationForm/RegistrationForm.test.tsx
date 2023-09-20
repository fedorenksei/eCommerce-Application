import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { App } from '../../app';

const rightEmail = 'uac@mail.ru';
const rightPassword = 'asdASD123&';
const rightDate = '2000-05-12';
const wrongEmail = 'uac@';
const wrongPassword = 'asdA';
const wrongDate = '2015-05-12';

test('component just rendering', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Sign up'));
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Password')).toBeInTheDocument();
  expect(screen.getByText('Confirm password')).toBeInTheDocument();
  expect(screen.getByText('First name')).toBeInTheDocument();
  expect(screen.getByText('Last name')).toBeInTheDocument();
  expect(screen.getByText('Date of birth')).toBeInTheDocument();
});

test('Next step button disabled on initial step', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Sign up'));
  expect(screen.getByText('Next step').closest('button')).toBeDisabled();
});

test('There is clear error messages on wrong input', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Sign up'));

  await userEvent.type(screen.getByLabelText('Password'), wrongPassword);
  expect(
    screen.getByText(
      'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (such as !@#$%^&*)',
    ),
  ).toBeInTheDocument();
  expect(screen.getByText('Field is require')).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText('Email'), wrongEmail);
  expect(
    screen.getByText(
      "Email must be properly formatted, contain a domain name, contain an '@' symbol separating local part and domain name (e.g., user@example.com), no contain whitespaces and domain length at least 2 characters",
    ),
  ).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Date of birth'), {
    target: { value: wrongDate },
  });
  await userEvent.click(screen.getByLabelText('Date of birth'));

  expect(
    screen.getByText(
      'Users must be at least 13 years old to use this service.',
    ),
  ).toBeInTheDocument();
});

test('Button enabled after good input', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Sign up'));

  await userEvent.type(screen.getByLabelText('Email'), rightEmail);

  await userEvent.type(screen.getByLabelText('Password'), rightPassword);

  await userEvent.type(
    screen.getByLabelText('Confirm password'),
    rightPassword,
  );

  await userEvent.type(screen.getByLabelText('First name'), 'pupa');

  await userEvent.type(screen.getByLabelText('Last name'), 'lupa');

  fireEvent.change(screen.getByLabelText('Date of birth'), {
    target: { value: rightDate },
  });
  await userEvent.click(screen.getByLabelText('Date of birth'));

  expect(screen.getByText('Next step').closest('button')).toBeEnabled();
});

test('Next step of form is loaded', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Sign up'));

  await userEvent.type(screen.getByLabelText('Email'), rightEmail);

  await userEvent.type(screen.getByLabelText('Password'), rightPassword);

  await userEvent.type(
    screen.getByLabelText('Confirm password'),
    rightPassword,
  );

  await userEvent.type(screen.getByLabelText('First name'), 'pupa');

  await userEvent.type(screen.getByLabelText('Last name'), 'lupa');

  fireEvent.change(screen.getByLabelText('Date of birth'), {
    target: { value: rightDate },
  });
  await userEvent.click(screen.getByLabelText('Date of birth'));

  await userEvent.click(screen.getByText('Next step'));

  expect(screen.getByText('Shipping address')).toBeInTheDocument();
  expect(screen.getByText('Billing address')).toBeInTheDocument();
  expect(screen.getAllByText('City')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Street')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Postal code')[0]).toBeInTheDocument();
  expect(screen.getAllByText('Set address as default')[0]).toBeInTheDocument();
});

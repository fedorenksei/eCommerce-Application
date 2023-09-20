import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { App } from '../../app';

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

  await userEvent.type(screen.getByLabelText('Password'), '123');
  expect(
    screen.getByText(
      'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (such as !@#$%^&*)',
    ),
  ).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText('Email'), 'a');
  expect(
    screen.getByText(
      "Email must be properly formatted, contain a domain name, contain an '@' symbol separating local part and domain name (e.g., user@example.com), no contain whitespaces and domain length at least 2 characters",
    ),
  ).toBeInTheDocument();
});

test('Button enabled after good input', async () => {
  render(App);
  await userEvent.click(screen.getByTitle('Log in'));

  await userEvent.type(screen.getByLabelText('Email'), 'uac@mail.ru');

  await userEvent.type(screen.getByLabelText('Password'), 'asdASD123&');
  expect(
    screen.getByText('Log in', { selector: 'button[type="submit"]' }),
  ).toBeEnabled();
});

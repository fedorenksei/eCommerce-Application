import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Header6 } from '.';

test('Element renders', () => {
  const text = 'A test header';
  render(<Header6>{text}</Header6>);
  expect(screen.getByText(text)).toBeInTheDocument();
});

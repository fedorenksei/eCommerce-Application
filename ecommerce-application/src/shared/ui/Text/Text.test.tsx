import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Text } from './Text';

test('Element renders', () => {
  const text = 'A test header';
  render(<Text type="h1">{text}</Text>);
  expect(screen.getByText(text)).toBeInTheDocument();
});

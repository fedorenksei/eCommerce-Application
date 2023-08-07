import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Palette } from './Palette';

describe('Test that tests work', () => {
  it('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });

  it('Element renders', () => {
    render(<Palette />);
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });
});

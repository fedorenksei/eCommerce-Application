import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { Palette } from './Palette';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { BrowserRouter } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
};

describe('Test that tests work', () => {
  it('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });

  it('Element renders', () => {
    const AllTheProviders = ({ children }: Props) => {
      return (
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      );
    };
    render(<Palette />, { wrapper: AllTheProviders });
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });
});

import React from 'react';
import { Header } from '../widgets/Header';
import { withProviders } from './providers';

const AppComponent = () => {
  return <Header />;
};

export const App = withProviders(<AppComponent />);

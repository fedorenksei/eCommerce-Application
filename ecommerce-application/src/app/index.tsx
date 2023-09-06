import React from 'react';
import { Header } from '../widgets/Header';
import { withProviders } from './providers';
import { Modal } from '../shared/ui/modals';

const AppComponent = () => {
  return (
    <>
      <Header />
      <Modal />
    </>
  );
};

export const App = withProviders(<AppComponent />);

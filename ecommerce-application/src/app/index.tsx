import React from 'react';
import { Header } from '../widgets/Header';
import { withProviders } from './providers';
import { ServerAPI } from '../shared/api/ServerAPI';
import { Modal } from '../shared/ui/modals';

const AppComponent = () => {
  const serverAPI = ServerAPI.getInstance();
  serverAPI.preflight();
  return (
    <>
      <Header />
      <Modal />
    </>
  );
};

export const App = withProviders(<AppComponent />);

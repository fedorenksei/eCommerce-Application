import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app';
import { ServerAPI } from './shared/api/ServerAPI';

type Props = {
  component: JSX.Element;
};
export const Init = ({ component }: Props) => {
  const serverAPI = ServerAPI.getInstance();
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    const start = async () => {
      await serverAPI.init();
      setIsReady(true);
    };
    start();
  }, [serverAPI]);
  return <>{isReady ? component : ''}</>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Init component={App} />
  </React.StrictMode>,
);

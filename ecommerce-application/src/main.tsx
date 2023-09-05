import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app';
import { ServerAPI } from './shared/api/ServerAPI';

const serverAPI = ServerAPI.getInstance();
await serverAPI.preflight();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>{App}</>
  </React.StrictMode>,
);

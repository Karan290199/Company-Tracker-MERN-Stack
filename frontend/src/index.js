import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CompanyContextProvider } from './context/CompanyContext';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CompanyContextProvider>
      <UserContextProvider>
        <App/>
      </UserContextProvider>
    </CompanyContextProvider>
  </React.StrictMode>
)
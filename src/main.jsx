import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import ContactProvider from './context/contactProvider';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContactProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ContactProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from "../src/Components/Authentication/Store"
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId='801457418922-u3eh39idmlp4red25ek8k1fdf1u96vu5.apps.googleusercontent.com'>
      <Provider store={store}>
        <App />
      </Provider >
    </GoogleOAuthProvider>
  </BrowserRouter>
);

reportWebVitals();

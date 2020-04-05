import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'typeface-roboto';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { SessionContextProvider } from './components/core/SessionContext';
import it from 'date-fns/locale/it';
import { setDefaultLocale, registerLocale } from 'react-datepicker';

setDefaultLocale('it');
registerLocale('it', it);

ReactDOM.render(
  <BrowserRouter>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
process.env.NODE_ENV !== 'production' ? serviceWorker.unregister() : serviceWorker.register();

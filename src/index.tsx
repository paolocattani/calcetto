import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'typeface-roboto';

import * as serviceWorker from './serviceWorker';

import it from 'date-fns/locale/it';
import { setDefaultLocale, registerLocale } from 'react-datepicker';

import Entry from './components/App/Entry';

setDefaultLocale('it');
registerLocale('it', it);

ReactDOM.render(<Entry />, document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
//process.env.NODE_ENV !== 'production' ? serviceWorker.unregister() : serviceWorker.register();
serviceWorker.unregister();

// Redefine console so it does not in production env
if (process.env.NODE_ENV === 'production') {
  if (!window.console) (window as any).console = {};
  ['log', 'debug', 'warn', 'info'].forEach((e) => ((window as any).console[e] = () => {}));
}

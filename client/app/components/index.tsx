import React from 'react';
import { render } from 'react-dom';

import App from './App.tsx';

import '../sass/styles.sass';

render(
  <App />,
  window.document.getElementById('root'),
);

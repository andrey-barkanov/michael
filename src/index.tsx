import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Application from './scenes/Application';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <BrowserRouter>
      <Application/>
    </BrowserRouter>,
    document.getElementById('application'));
});

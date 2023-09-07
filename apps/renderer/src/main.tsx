import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import './styles/global.css';
import { App } from './app/app';
import { ThemeProvider } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

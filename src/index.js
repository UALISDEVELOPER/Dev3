import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"

//MUI font
import fontTheme from "./theme/theme"

//MUI RTL
import { ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});



ReactDOM.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={fontTheme}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ThemeProvider>
  </CacheProvider>,
  document.getElementById('root')
);

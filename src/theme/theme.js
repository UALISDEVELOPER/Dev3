import Yekan from './font/Yekan/Yekan.eot';
import { createTheme } from '@mui/material/styles';
 
const yekan = {
 fontFamily: 'Yekan',
 fontStyle: 'semi-bold',
 fontDisplay: 'swap',
 fontWeight: '600',
 src: `
   url(${Yekan}) format('eot')
 `,
 unicodeRange:
   'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};


const fontTheme = createTheme({
    typography: {
      fontFamily: [ 'Roboto', 'Yekan','Open Sans'].join(','),
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [yekan],
        },
      }
    },
    direction: 'rtl', // Both here and <body dir="rtl">
  })

export default fontTheme;
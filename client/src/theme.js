import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      // light: '#FFFFFF',
      main: '#201E5A',
      contrastText: '#fff',
      // dark: '#201E5A',
    },
    secondary: {
      main: '#F15852',
    },
    active: {
      backgroundColor: '#69BE28',
    },
    // to use active use style={theme.palette.active}
  },
  typography: {
    h1: {
      fontFamily: 'Merriweather',
      fontSize: '4rem',
    },
    h2: {
      fontFamily: 'Merriweather',
      fontSize: '2.5rem',
    },
    h3: {
      fontFamily: 'Merriweather Sans',
      fontSize: '2rem',
    },
    h4: {
      fontFamily: 'Merriweather Sans',
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: 'Merriweather Sans',
      fontSize: '1rem',
    },
    h6: {
      fontFamily: 'Merriweather Sans',
      fontSize: '0.75rem',
    },
    button: {
      fontFamily: 'Merriweather Sans',
      fontSize: '1rem',
    },
  },
});

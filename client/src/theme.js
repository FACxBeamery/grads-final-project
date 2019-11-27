import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      // light: '#FFFFFF',
      main: '#201E5A',
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
    },
    h2: {
      fontFamily: 'Merriweather Sans',
    },
    h3: {
      fontFamily: 'Merriweather Sans',
    },
    h4: {
      fontFamily: 'Merriweather Sans',
    },
    button: {
      fontFamily: 'Merriweather Sans',
    },
    p: {
      fontFamily: 'Merriweather Sans',
    },
    span: {
      fontFamily: 'Merriweather Sans',
    },
  },
});

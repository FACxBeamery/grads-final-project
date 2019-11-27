import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, Button } from '@material-ui/core';
import store from './store';
import { Provider } from 'react-redux';
import Main from './components/Main/Main';
import Header from './components/Header/Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#FFFFFF',
      main: '#201E5A',
      // dark: '#201E5A',
    },
    secondary: {
      main: '#F15852',
    },
    // error: will use the default color
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

const App = () => {
  console.log('STORE', store);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <Main />
        <Button color='primary' variant='contained' type='submit'>
          Submit
        </Button>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

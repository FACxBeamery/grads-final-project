import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, Button } from '@material-ui/core';
import Main from '../Main/Main';
import Header from '../Header/Header';

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
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main />
      <Button color='primary' variant='contained' type='submit'>
        Submit
      </Button>
    </ThemeProvider>
  );
};

export default App;

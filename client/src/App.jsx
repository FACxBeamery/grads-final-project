import React from 'react';
import { ThemeProvider, Button, Box } from '@material-ui/core';
import { Provider } from 'react-redux';
import theme from './theme';
import store from './store';
import Main from './components/Main/Main';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box mb={5}>
          <Header />
        </Box>
        <Main />
        <Button color='primary' variant='contained' type='submit'>
          Submit
        </Button>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

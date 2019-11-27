import React from 'react';
import theme from './theme';
import { ThemeProvider, Button } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main/Main';
import Header from './components/Header/Header';

const App = () => {
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

import React from 'react';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';
import store from './store';
import { Provider } from 'react-redux';
import Main from './components/Main/Main';
import Header from './components/Header/Header';

const App = () => {
  console.log('STORE', store);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <Main />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

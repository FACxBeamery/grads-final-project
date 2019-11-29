import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import store from './store';
import Main from './components/Main/Main';
import Header from './components/Header/Header';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {<Header />}
        <Main />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

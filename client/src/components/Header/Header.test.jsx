import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';
import store from '../../store';

test('check Header renders on page', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>,
  );
  const AppBar = getByTestId('app-bar');
  expect(AppBar).toBeInTheDocument();
});

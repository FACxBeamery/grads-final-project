import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

test('check Header renders on page', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );
  const AppBar = getByTestId('app-bar');
  expect(AppBar).toBeInTheDocument();
});

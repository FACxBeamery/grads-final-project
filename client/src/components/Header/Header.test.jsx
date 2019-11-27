import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

test('check Header renders on page', () => {
  const { getByTestId } = render(<Header />);
  const AppBar = getByTestId('app-bar');
  expect(AppBar).toBeInTheDocument();
});

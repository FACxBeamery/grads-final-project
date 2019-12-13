import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import PageNotFound from '.';

it('Testing the default route page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>,
  );

  expect(getByText('Sorry, that page doesn’t exist!')).toBeVisible();

  expect(getByText('Taking a Survey?')).toBeVisible();
  expect(getByText('Check if you got the right link')).toBeVisible();
  expect(getByText('Are you an Admin?')).toBeVisible();

  const goToDashboardButton = getByText('Go to Dashboard');
  expect(goToDashboardButton).toBeVisible();

  fireEvent.click(goToDashboardButton);
});

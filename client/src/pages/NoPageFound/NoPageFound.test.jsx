import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import NoPageFound from '.';

it('Testing the default route page', () => {
  const { getByText } = render(
    <BrowserRouter>
      <NoPageFound location={{ pathname: '/nopage' }} />
    </BrowserRouter>,
  );

  expect(
    getByText(
      /404: Page not found\. We're sorry, we couldn't find \/[\w]+ for you\./,
    ),
  ).toBeVisible();

  expect(
    getByText('Survey recipients, please check the link you have been sent.'),
  ).toBeVisible();

  expect(getByText('Are you an admin?')).toBeVisible();

  const goToDashboardButton = getByText('Go to the Dashboard');
  expect(goToDashboardButton).toBeVisible();

  fireEvent.click(goToDashboardButton);

  expect(location.pathname).toBe('/admin/');
});

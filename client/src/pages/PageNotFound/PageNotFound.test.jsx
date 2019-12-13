import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PageNotFound from '.';

it('Testing the default route page', () => {
  const { getByText } = render(<PageNotFound />);

  expect(getByText('Sorry, that page doesn’t exist!')).toBeVisible();

  expect(getByText('Are you an admin?')).toBeVisible();

  const goToDashboardButton = getByText('Go to Dashboard');
  expect(goToDashboardButton).toBeVisible();

  fireEvent.click(goToDashboardButton);
});

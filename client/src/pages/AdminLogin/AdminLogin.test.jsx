import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../../store';
import AdminLogin from '.';

jest.mock('./apiCalls');

describe('My Connected React-Redux Component', () => {

  it('<AdminLogin /> displays welcome message, two input fields and sign in button', async () => {
    const { getByText, getAllByLabelText, getAllByRole } = render(
      <BrowserRouter>
        <Provider store={store}>
          <AdminLogin />
        </Provider>
      </BrowserRouter>
    );

    expect(getByText('Welcome.')).toBeInTheDocument();

    // Grab username and password input
    const usernameField = getAllByLabelText('Email Address', {
      exact: false,
    });
    const passwordField = getAllByLabelText('Email Address', {
      exact: false,
    });
    const submitButton = getByText('Sign In', {
      exact: false,
    });

    expect(usernameField).toHaveLength(1);
    expect(passwordField).toHaveLength(1);
    expect(submitButton).toBeInTheDocument();

    fireEvent.submit(submitButton.closest('button'));

    const helperText = await waitForElement(
      () => getByText('Missing credentials'),
      {},
    );

    getAllByRole('textbox').forEach((textbox) => {
      fireEvent.change(textbox, {
        target: { value: 'a' },
      });
    });

    fireEvent.submit(submitButton.closest('button'));

    const helperText2 = await waitForElement(
      () => getByText('Bad credentials. Username and password do not match.'),
      {},
    );

    getAllByRole('textbox').forEach((textbox) => {
      fireEvent.change(textbox, {
        target: { value: 'admin' },
      });
    });

    fireEvent.submit(submitButton.closest('button'));

    expect(helperText).not.toBeInTheDocument();

    expect(helperText2).not.toBeInTheDocument();
  });
});

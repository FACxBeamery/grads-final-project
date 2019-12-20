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
      </BrowserRouter>,
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

    expect(submitButton.closest('button').disabled).toEqual(true);

    fireEvent.submit(submitButton.closest('button'));

    getAllByRole('textbox').forEach((textbox) => {
      fireEvent.change(textbox, {
        target: { value: 'ad' },
      });
    });

    const helperText = await waitForElement(
      () => getByText('Use a valid email format'),
      {},
    );

    getAllByRole('textbox').forEach((textbox) => {
      fireEvent.change(textbox, {
        target: { value: 'steven.bianchi@beamer.com' },
      });
    });

    expect(helperText).not.toBeInTheDocument();

    expect(submitButton.closest('button').disabled).toEqual(false);

    fireEvent.submit(submitButton.closest('button'));

    const helperText2 = await waitForElement(
      () => getByText('Bad credentials. Username and password do not match.'),
      {},
    );

    getAllByRole('textbox').forEach((textbox) => {
      fireEvent.change(textbox, {
        target: { value: 'steven.bianchi@beamery.com' },
      });
    });

    fireEvent.submit(submitButton.closest('button'));

    expect(helperText).not.toBeInTheDocument();

    expect(helperText2).not.toBeInTheDocument();
  });
});

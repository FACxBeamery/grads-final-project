import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import CreateSurveyForm from '.';
import store from '../../store';

describe('Form works as expected', () => {
  it('shoudl display error message if title too short', () => {
    const { getAllByRole, getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <CreateSurveyForm questionIndex={0} />
        </Provider>
      </BrowserRouter>,
    );

    const inputs = getAllByRole('textbox');

    const titleInput = inputs[0];

    const longString = 'a'.repeat(61);

    fireEvent.change(titleInput, { target: { value: longString } });

    getByText('Title must be less than 60 characters!', { exact: false });
  });
});

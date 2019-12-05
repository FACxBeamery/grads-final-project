import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SurveyDetail from '.';
import store from '../../store';

describe('Testing the Survey Detail page', () => {
  it('', () => {
    const { getAllByRole, getByText } = render(
      <Provider store={store}>
        <SurveyDetail />
      </Provider>,
    );

    const inputs = getAllByRole('textbox');

    const titleInput = inputs[0];

    const longString = 'a'.repeat(61);

    fireEvent.change(titleInput, { target: { value: longString } });
    fireEvent.click(addQuestionButton);

    getByText('Title must be less than 60 characters!', { exact: false });
  });
});

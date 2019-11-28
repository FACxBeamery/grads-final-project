import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateSurveyForm from '.';
import store from '../../store';

describe('Form works as expected', () => {
  it('shoudl display error message if title too short', () => {
    const { getAllByRole, getByText } = render(
      <Provider store={store}>
        <CreateSurveyForm questionIndex={0} />
      </Provider>,
    );

    const inputs = getAllByRole('textbox');

    const titleInput = inputs[0];

    fireEvent.change(titleInput, { target: { value: 'a' } });

    getByText('Title must be between 10 and 30 characters!', { exact: false });
  });
});

// const response = responses[currentStep]

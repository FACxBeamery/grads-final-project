import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Options from './Options';
import store from '../../../store/index';

describe('Options in multichoice works as expected', () => {
  it('should display one option initially', () => {
    const { getAllByLabelText } = render(
      <Provider store={store}>
        <Options questionIndex={0} />
      </Provider>,
    );

    const optionsArray = getAllByLabelText('Answer text', { exact: false });

    expect(optionsArray).toHaveLength(1);
  });

  it('adds another answer when new answer is clicked', () => {
    const { getAllByLabelText, getByText } = render(
      <Provider store={store}>
        <Options questionIndex={0} />
      </Provider>,
    );

    const addAnswerButton = getByText('Add answer', { exact: false });

    fireEvent.click(addAnswerButton);

    const optionsArray = getAllByLabelText('Answer text', { exact: false });

    expect(optionsArray).toHaveLength(2);
  });

  it('Clicking delete should delete the specfic option clicked on', () => {
    const { getAllByLabelText, getAllByRole, getAllByText } = render(
      <Provider store={store}>
        <Options questionIndex={0} />
      </Provider>,
    );

    const inputsArray = getAllByRole('textbox');

    expect(inputsArray).toHaveLength(2);

    fireEvent.change(inputsArray[0], {
      target: { value: "I won't be deleted" },
    });

    fireEvent.change(inputsArray[1], {
      target: { value: 'I will be deleted' },
    });

    const deleteButtons = getAllByText('DELETE', { exact: false });

    fireEvent.click(deleteButtons[1]);

    const optionsArray = getAllByLabelText('Answer text', { exact: false });

    expect(optionsArray).toHaveLength(1);

    expect(inputsArray[0].value).toBe("I won't be deleted");
  });

  it('Clicking delete with one option left should not work', () => {
    const { getAllByLabelText, getByText } = render(
      <Provider store={store}>
        <Options questionIndex={0} />
      </Provider>,
    );

    const optionsArray = getAllByLabelText('Answer text', { exact: false });

    expect(optionsArray).toHaveLength(1);

    const deleteButton = getByText('DELETE', { exact: false });

    fireEvent.click(deleteButton);

    expect(optionsArray).toHaveLength(1);
  });
});

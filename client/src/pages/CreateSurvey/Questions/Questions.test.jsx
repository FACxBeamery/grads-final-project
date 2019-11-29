import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Questions from './QuestionsList';
import store from '../../../store/index';

describe('Questions component works as expected', () => {
  it('should display one option initially', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Questions />
      </Provider>,
    );

    const questionsArray = getAllByText('Delete question', {
      exact: false,
    });

    expect(questionsArray).toHaveLength(1);
  });

  it('Adds another question when new question is clicked', () => {
    const { getAllByText, getByText } = render(
      <Provider store={store}>
        <Questions />
      </Provider>,
    );

    const addQuestionButton = getByText('Add question', { exact: false });

    fireEvent.click(addQuestionButton);

    const questionsArray = getAllByText('Delete question', {
      exact: false,
    });

    expect(questionsArray).toHaveLength(2);
  });

  it('Clicking delete should delete the specfic question clicked on', () => {
    const { getAllByRole, getAllByText } = render(
      <Provider store={store}>
        <Questions />
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

    const deleteButtons = getAllByText('Delete question', { exact: false });

    fireEvent.click(deleteButtons[1]);

    const questionsArray = getAllByText('Delete question', {
      exact: false,
    });

    expect(questionsArray).toHaveLength(1);

    expect(inputsArray[0].value).toBe("I won't be deleted");
  });

  it('Clicking delete with one option left should not work', () => {
    const { getAllByText, getByText } = render(
      <Provider store={store}>
        <Questions />
      </Provider>,
    );

    const questionsArray = getAllByText('Delete question', {
      exact: false,
    });

    expect(questionsArray).toHaveLength(1);

    const deleteButton = getByText('Delete question', { exact: false });

    fireEvent.click(deleteButton);

    expect(questionsArray).toHaveLength(1);
  });

  // TESTING A DROPDOWN WITH MATERIAL UI IS THE HARDEST THING EVER
  // it('Selecting multichoice should render options', () => {
  //   const { getByTestId, getByText } = render(
  //     <Provider store={store}>
  //       <Questions />
  //     </Provider>,
  //   );

  //   const selectType = getByTestId('select-type');

  //   fireEvent.change(selectType, { target: { value: 'multichoice' } });

  //   getByText('ANSWERS:', { exact: false });

  // });
});

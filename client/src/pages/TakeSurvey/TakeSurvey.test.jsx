import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TakeSurvey from './index';
import store from '../../store/index';

const dummySurvey = {
  id: 1,
  title: 'Graduates Onboarding',
  description:
    'A survey description that is about 1 sentence long yeah blah blah',
  status: 'created',
  dateCreated: 1573826615,
  dateToPublish: 1574345041,
  datePublished: '',
  dateToClose: 1576937061,
  dateClosed: '',
  anonymous: false,
  recipients: [
    {
      employeeId: 1,
      completed: false,
    },
    {
      employeeId: 2,
      completed: false,
    },
    {
      employeeId: 3,
      completed: false,
    },
    {
      employeeId: 4,
      completed: false,
    },
    {
      employeeId: 5,
      completed: false,
    },
    {
      employeeId: 6,
      completed: false,
    },
  ],
  questions: [
    {
      id: 1,

      title: 'Please describe your first week in few sentences',
      type: 'text',
      required: true,
      commentEnabled: true,
    },
    {
      id: 2,
      title: 'How did you feel at work this week?',
      type: 'multichoice',
      required: true,
      commentEnabled: true,
      options: [
        { text: 'really bad', position: 0 },
        { text: 'bad', position: 1 },
        { text: 'meh', position: 2 },
        { text: 'good', position: 3 },
        { text: 'great', position: 4 },
      ],
    },
    {
      id: 3,
      title: "I see myself still working at B*amery in two years' time",
      type: 'multichoice',
      required: true,
      commentEnabled: true,
      options: [
        { text: 'strongly disagree', position: 0 },
        { text: 'disagree', position: 1 },
        { text: 'neutral', position: 2 },
        { text: 'agree', position: 3 },
        { text: 'strongly agree', position: 4 },
      ],
    },
  ],
  responses: [],
};

describe('test take survey components work together', () => {
  it('check clicking next button makes question card render', () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummySurvey }),
    );
    const { getByTestId } = render(
      <Provider store={store}>
        <TakeSurvey />
      </Provider>,
    );

    const NextButton = getByTestId('next-button');

    fireEvent.click(NextButton);

    const QuestionCard = getByTestId('question-card');
    expect(QuestionCard).toBeInTheDocument();
  });

  it('check clicking previous button returns to survey description', () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummySurvey }),
    );
    const { getByTestId } = render(
      <Provider store={store}>
        <TakeSurvey />
      </Provider>,
    );

    const PreviousButton = getByTestId('previous-button');

    fireEvent.click(PreviousButton);
    const SurveyDescriptionText = getByTestId('survey-description');
    const SurveyTitleText = getByTestId('survey-title');
    //  const SurveyDisclaimerText = getByTestId("survey-disclaimer)
    expect(SurveyDescriptionText).toBeInTheDocument();
    expect(SurveyTitleText).toBeInTheDocument();
  });

  it('test entire user journey gets to final submit page', () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummySurvey }),
    );
    const { getByTestId, getByRole, getByText } = render(
      <Provider store={store}>
        <TakeSurvey />
      </Provider>,
    );

    const NextButton = getByTestId('next-button');

    fireEvent.click(NextButton);

    const textQuestion = getByRole('textbox');
    fireEvent.change(textQuestion, { target: { value: 'abc' } });
    const NextButton2 = getByTestId('next-button');
    fireEvent.click(NextButton2);

    const multichoiceAnswer1 = getByText('meh', { exact: false });
    const NextButton3 = getByTestId('next-button');
    fireEvent.click(multichoiceAnswer1);

    fireEvent.click(NextButton3);

    const multichoiceAnswer2 = getByText('neutral', { exact: false });
    const NextButton4 = getByTestId('next-button');
    fireEvent.click(multichoiceAnswer2);
    fireEvent.click(NextButton4);

    const SurveySubmit = getByTestId('survey-submit');
    expect(SurveySubmit).toBeInTheDocument();
  });
});

/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';
import SurveyDetail from '.';
import store from '../../store/index';
import formatDate from '../../utils/formatDate';

const dummySurvey = {
  _id: '508f1f99bcf86cd799439014',
  title: 'Graduates Onboarding',
  description:
    'A survey description that is about 1 sentence long yeah blah blah',
  status: 'draft',
  dateCreated: 1573826615,
  dateToPublish: 1574345041,
  datePublished: '',
  dateToClose: 1576937061,
  dateClosed: '',
  anonymous: false,
  recipients: [
    {
      completed: false,
    },
    {
      completed: false,
    },
    {
      completed: false,
    },
    {
      completed: false,
    },
    {
      completed: false,
    },
    {
      completed: false,
    },
  ],
  questions: [{ position: 1 }],
  responses: [],
};

const dummySurveyPublished = {
  ...dummySurvey,
  status: 'active',
  datePublished: Date.now(),
};

const dummySurveyClosed = {
  ...dummySurvey,
  status: 'closed',
  dateClosed: Date.now(),
};

describe('Testing the Survey Detail page', () => {
  it('Testing the workings of the entire Survey Detail page, including the stepper and buttons.', async () => {
    // eslint-disable-next-line no-underscore-dangle
    global.confirm = jest.fn().mockImplementation(() => true);

    const mockAxiosGetFirst = jest.spyOn(axios, 'get');
    mockAxiosGetFirst.mockImplementation((url) => {
      if (url === '/employees') {
        return Promise.resolve({ data: dummySurvey.recipients });
      }
      return Promise.resolve({ data: dummySurvey });
    });

    const mockAxiosPatch = jest.spyOn(axios, 'patch');
    mockAxiosPatch.mockImplementation(() => Promise.resolve({}));

    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <SurveyDetail
            match={{ params: { id: dummySurvey._id } }}
            surveyId={dummySurvey._id}
          />
        </Provider>
      </BrowserRouter>,
    );

    const dummySurveyTitle = await waitForElement(() =>
      getByText(dummySurvey.title),
    );

    expect(dummySurveyTitle).toBeVisible();
    expect(getByText(dummySurvey.description)).toBeVisible();

    expect(getByText('Activate Survey')).toBeVisible();
    expect(getByText('Edit survey')).toBeVisible();

    expect(getByText(`Drafted`)).toBeVisible();
    expect(getByText(`${formatDate(dummySurvey.dateCreated)}`)).toBeVisible();
    expect(getByText(`Activated`)).toBeVisible();
    expect(getByText(`Closed`)).toBeVisible();

    expect(getByText('Recipients')).toBeVisible();
    expect(
      getByText('To edit recipient list, select Edit Survey'),
    ).toBeVisible();

    mockAxiosGetFirst.mockRestore();

    fireEvent.click(getByText('Publish Survey'));

    const mockAxiosGetSecond = jest.spyOn(axios, 'get');
    mockAxiosGetSecond.mockImplementation((url) => {
      if (url === '/employees') {
        return Promise.resolve({ data: dummySurveyPublished.recipients });
      }
      return Promise.resolve({ data: dummySurveyPublished });
    });

    const closeSurveyButton = await waitForElement(() =>
      getByText('Close Survey'),
    );

    expect(closeSurveyButton).toBeVisible();

    expect(getByText(`Activated`)).toBeVisible();
    expect(
      getByText(`${formatDate(dummySurveyPublished.datePublished)}`),
    ).toBeVisible();
    expect(getByTestId('survey-detail-stepper')).toBeVisible();

    expect(
      getByText(
        `${dummySurveyPublished.responses.length}/${dummySurveyPublished.recipients.length}`,
      ),
    ).toBeVisible();
    expect(getByText('respondents')).toBeVisible();

    mockAxiosGetSecond.mockRestore();

    fireEvent.click(getByText('Close Survey'));
    const mockAxiosGetThird = jest.spyOn(axios, 'get');
    mockAxiosGetThird.mockImplementation((url) => {
      if (url === '/employees') {
        return Promise.resolve({ data: dummySurveyClosed.recipients });
      }
      return Promise.resolve({ data: dummySurveyClosed });
    });

    const closedSurveyStepperText = await waitForElement(() =>
      getByText(`Closed ${formatDate(dummySurveyClosed.dateClosed)}`),
    );

    expect(closedSurveyStepperText).toBeVisible();

    expect(
      getByText(
        `${dummySurveyClosed.responses.length}/${dummySurveyClosed.recipients.length}`,
      ),
    ).toBeVisible();
    expect(getByText('respondents')).toBeVisible();

    mockAxiosGetThird.mockRestore();
  });
});

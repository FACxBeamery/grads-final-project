import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
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

describe('Testing the Survey Detail page', () => {
  it('', () => {
    // eslint-disable-next-line no-underscore-dangle
    const mockAxiosGet = jest.spyOn(axios, 'get');
    // mockAxiosGet.mockImplementation((url) => {
    //   if (url === '/employees') {
    //     return Promise.resolve({ data: dummySurvey.recipients });
    //   }
    //   return Promise.resolve({ data: dummySurvey });
    // });

    mockAxiosGet.mockImplementationOnce(() =>
      Promise.resolve({ data: dummySurvey.recipients }),
    );

    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <SurveyDetail
            match={{ params: { id: dummySurvey._id } }}
            surveyId={dummySurvey._id}
          />
        </Provider>
      </BrowserRouter>,
    );

    expect(getByText(dummySurvey.title)).toBeVisible();
    expect(getByText(dummySurvey.description)).toBeVisible();

    expect(getByText('EDIT SURVEY')).toBeVisible();
    expect(getByText('PUBLISH SURVEY')).toBeVisible();

    expect(
      getByText(`Drafted\n${formatDate(dummySurvey.dateCreated)}`),
    ).toBeVisible();
    expect(getByText(`Publish\npending`)).toBeVisible();
    expect(getByText(`Closed\npending`)).toBeVisible();

    expect(getByText('Recipients')).toBeVisible();
    expect(
      getByText('To edit recipient list, select Edit Survey'),
    ).toBeVisible();

    fireEvent.click(getByText('PUBLISH SURVEY'));

    expect(getByText('PUBLISH SURVEY')).toNotBeVisible();
    expect(getByText('EDIT SURVEY')).toNotBeVisible();

    expect(getByText(`Publish\npending`)).toNotBeVisible();
    expect(getByText(/Published\n..\/..\/../)).toBeVisible();

    expect(getByText('0/6 respondents')).toBeVisible();

    fireEvent.click(getByText('EXIT SURVEY'));

    expect(getByText(`Closed\npending`)).toNotBeVisible();
    expect(getByText(/Closed\n..\/..\/../)).toBeVisible();

    mockAxiosGet.mockRestore();
  });
});

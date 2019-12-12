import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/index';
import Dashboard from './index';

const dummyData = [
  {
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
  },
  {
    title: 'All employees survey',
    description:
      'A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0',
    status: 'active',
    dateCreated: 1572617513,
    dateToPublish: 1574259113,
    datePublished: 1574259113,
    dateToClose: 1576851113,
    dateClosed: '',
    anonymous: true,
    recipients: [
      {
        completed: true,
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
    questions: [
      { position: 1 },
      { position: 2 },
      { position: 3 },
      { position: 4 },
      { position: 5 },
      { position: 6 },
      { position: 7 },
      { position: 8 },
      { position: 9 },
    ],
    responses: [
      {
        employeeId: null,
        answers: [
          {
            answer:
              'My first week was okay. I am just writing sentences for dummy data. Here is another sentence',
            comment: 'This is my comment on this answer',
          },
          {
            answer: 'meh',
            comment: null,
          },
          {
            answer: 'strongly agree',
            comment: 'I am commenting on this question',
          },
          {
            answer: 'Hi another sentence to mock data!',
          },
          {
            answer: 'Hi another sentence to mock data! Number 2',
          },
          {
            answer: 'Hi another sentence to mock data! Number 2',
          },
          {
            answer: 'Hi another sentence to mock data! Number 3',
          },
          {
            answer: 'Hi another sentence to mock data! Number 4',
          },
          {
            answer: 'yes',
          },
        ],
      },
      {
        employeeId: null,
        answers: [
          {
            answer:
              'My first week was great. I am just writing sentences for another dummy data. Here is another sentence',
            comment: 'This is my comment on this answer',
          },
          {
            answer: 'good',
            comment: null,
          },
          {
            answer: 'neutral',
            comment: 'I am commenting on this question',
          },
          {
            answer: '2nd response Hi another sentence to mock data!',
          },
          {
            answer: '2nd response Hi another sentence to mock data! Number 2',
          },
          {
            answer: '2nd response Hi another sentence to mock data! Number 2',
          },
          {
            answer: '2nd response Hi another sentence to mock data! Number 3',
          },
          {
            answer: '2nd response Hi another sentence to mock data! Number 4',
          },
          {
            answer: 'no',
          },
        ],
      },
    ],
  },
  {
    title: 'People Team - engagement survey',
    description:
      'A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0',
    status: 'closed',
    dateCreated: 1572617513,
    dateToPublish: 1574259113,
    datePublished: 1574259113,
    dateToClose: 1576851113,
    dateClosed: 1576851113,
    anonymous: true,
    recipients: [
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: true,
      },
      {
        completed: true,
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
    questions: [
      { position: 0 },
      { position: 1 },
      { position: 2 },
      { position: 3 },
    ],
    responses: [
      {
        answers: [
          {
            answer: 1,
          },
          {
            answer: 'no! im okay!',
          },
          {
            answer: 3,
          },
        ],
      },
      {
        answers: [
          {
            answer: 0,
          },
          {
            answer: 'no! im okay!',
          },
          {
            answer: 2,
          },
        ],
      },
      {
        answers: [
          {
            answer: 0,
          },
          {
            answer: 'no! im okay!',
          },
          {
            answer: 2,
          },
        ],
      },
      {
        answers: [
          {
            answer: 0,
          },
          {
            answer: 'no! im oapsodmnaposmx aks xpioa scxkay!',
          },
          {
            answer: 1,
          },
        ],
      },
      {
        answers: [
          {
            answer: 1,
          },
          {
            answer: 'no! imapiosdma sd ipkq wd !!! scxkay!',
          },
          {
            answer: 4,
          },
        ],
      },
    ],
  },
];

describe('Testing Dashboard', () => {
  it('should alternate between two button texts', () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: dummyData }));
    const { getByText } = render(
      // eslint-disable-next-line react/jsx-filename-extension
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>,
    );
    expect(getByText('See all Surveys')).toBeInTheDocument();
    fireEvent.click(getByText('See all Surveys'));
    expect(getByText('See only Active and Draft Surveys')).toBeInTheDocument();
    mockAxiosGet.mockRestore();
  });
  it('should alternate between two title texts', () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() => Promise.resolve({ data: dummyData }));
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>,
    );
    expect(getByText('All Surveys')).toBeInTheDocument();
    fireEvent.click(getByText('See only Active and Draft Surveys'));
    expect(getByText('Active Surveys')).toBeInTheDocument();
    expect(getByText('Draft Surveys')).toBeInTheDocument();
    mockAxiosGet.mockRestore();
  });
});

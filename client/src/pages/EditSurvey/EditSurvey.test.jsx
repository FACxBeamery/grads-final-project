import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import EditSurveyForm from '.';
import store from '../../store';
import axios from 'axios';
import formatDate from '../../utils/formatDate';

const dummyResponse = {
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
  questions: [
    {
      title: 'Please describe your first week in few sentences',
      type: 'text',
      required: true,
      commentEnabled: true,
    },
  ],
  responses: [],
};

describe('Form works as expected', () => {
  it('shoudl display error message if title too short', () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummyResponse }),
    );
    const { getAllByRole, getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <EditSurveyForm
            match={{ params: { id: 1 }, isExact: true, path: '', url: '' }}
          />
        </Provider>
      </BrowserRouter>,
    );

    const inputs = getAllByRole('textbox');

    const titleInput = inputs[0];

    const longString = 'a'.repeat(61);

    fireEvent.change(titleInput, { target: { value: longString } });

    getByText('Title must be less than 60 characters!', { exact: false });

    const buttonSaveChanges = getByText('Save changes');
    fireEvent.click(buttonSaveChanges);

    expect(getByText('Created on: 10/12/2019')).toBeInTheDocument();
  });
});

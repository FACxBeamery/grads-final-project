import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

import store from '../../store';
import EmployeeTable from '.';

const dummyEmployees = [
  {
    id: '507f1f77bcf86cd799439011',
    firstName: 'Steven',
    lastName: 'Bianchi',
    jobTitle: 'VP People',
    startDate: '16/09/2019',
    department: 'People',
    location: 'GB',
    manager: 'Abakar Saidov',
    email: 'steven.bianchi@beamery.com',
    gender: 'Male',
    stage: 'ramping_up',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439012',
    firstName: 'Thomas',
    lastName: 'Kostrzewski',
    jobTitle: 'Graduate Software Engineer',
    startDate: '09/09/2019',
    department: 'Engineering',
    location: 'GB',
    manager: 'Andrew Celi',
    email: 'thomas.kostrzewski@beamery.com',
    gender: 'Male',
    stage: 'ramping_up',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439013',
    firstName: 'Antonio',
    lastName: 'Gargaro',
    jobTitle: 'Graduate Software Engineer',
    startDate: '09/09/2019',
    department: 'Engineering',
    location: 'GB',
    manager: 'Andrew Celi',
    email: 'antonio.gargaro@beamery.com',
    gender: 'Male',
    stage: 'ramping_up',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439014',
    firstName: 'Lyndsey',
    lastName: 'Scott',
    jobTitle: 'Graduate Software Engineer',
    startDate: '09/09/2019',
    department: 'Engineering',
    location: 'GB',
    manager: 'Andrew Celi',
    email: 'lyndsey.scott@beamery.com',
    gender: 'Female',
    stage: 'ramping_up',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439015',
    firstName: 'João',
    lastName: 'Viana',
    jobTitle: 'Graduate Software Engineer',
    startDate: '09/09/2019',
    department: 'Engineering',
    location: 'GB',
    manager: 'Andrew Celi',
    email: 'joao.viana@beamery.com',
    gender: 'Male',
    stage: 'registered',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439016',
    firstName: 'Tom',
    lastName: 'Galligan',
    jobTitle: 'Graduate Software Engineer',
    startDate: '09/09/2019',
    department: 'Engineering',
    location: 'GB',
    manager: 'Andrew Celi',
    email: 'tom.galligan@beamery.com',
    gender: 'Male',
    stage: 'ramping_up',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439017',
    firstName: 'Martha',
    lastName: 'Lambert',
    jobTitle: 'Graduate Software Engineer',
    startDate: '09/09/2019',
    department: 'Engineering',
    location: 'GB',
    manager: 'Andrew Celi',
    email: 'martha.lambert@beamery.com',
    gender: 'Female',
    stage: 'ramping_up',
    employmentStatus: '',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439018',
    firstName: 'Harshada',
    lastName: 'Shimpi',
    jobTitle: 'QA Engineer',
    startDate: '19/08/2019',
    department: 'Engineering',
    location: 'GB',
    manager: 'Gideon Gluckman',
    email: 'harshada.shimpi@beamery.com',
    gender: 'Female',
    stage: 'ramping_up',
    employmentStatus: '',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439019',
    firstName: 'Jeff',
    lastName: 'Lu',
    jobTitle: 'Head of Talent Acquisition',
    startDate: '05/08/2019',
    department: 'People',
    location: 'GB',
    manager: 'Steven Bianchi',
    email: 'jeff.lu@beamery.com',
    gender: 'Male',
    stage: 'ramping_up',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439023',
    firstName: 'Rachel',
    lastName: 'Skelton',
    jobTitle: 'HR and Talent manager',
    startDate: '02/07/2019',
    department: 'People',
    location: 'GB',
    manager: 'Steven Bianchi',
    email: 'rachel.skelton@beamery.com',
    gender: 'Female',
    stage: 'registered',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439033',
    firstName: 'Takveen',
    lastName: 'Bashir',
    jobTitle: 'Senior Technical Recruiter',
    startDate: '05/11/2018',
    department: 'People',
    location: 'GB',
    manager: 'Jeff Lu',
    email: 'takveen@beamery.com',
    gender: 'Female',
    stage: 'registered',
    employmentStatus: '',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439043',
    firstName: 'Milo',
    lastName: 'Abel',
    jobTitle: 'Recruiting Programs & Operations Associate',
    startDate: '16/07/2018',
    department: 'People',
    location: 'GB',
    manager: 'Murad Saidov',
    email: 'milo@beamery.com',
    gender: 'Male',
    stage: 'registered',
    employmentStatus: '',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439053',
    firstName: 'Minesh',
    lastName: 'Shah',
    jobTitle: 'Junior Software Engineer',
    startDate: '26/02/2018',
    department: 'Engineering',
    location: 'GB',
    manager: 'Daniel octavian Stanciu',
    email: 'minesh.shah@beamery.com',
    gender: 'Male',
    stage: 'registered',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439063',
    firstName: 'Adam',
    lastName: 'Rabinovitch',
    jobTitle: 'Lead Technical Recruiter',
    startDate: '01/02/2018',
    department: 'People',
    location: 'GB',
    manager: 'Jeff Lu',
    email: 'adam@beamery.com',
    gender: 'Male',
    stage: 'registered',
    employmentStatus: 'Permanent- FT',
    office: 'London',
  },
  {
    id: '507f1f77bcf86cd799439073',
    firstName: 'Natasha',
    lastName: 'Lees',
    jobTitle: 'Commercial Recruiting Lead',
    startDate: '18/12/2017',
    department: 'People',
    location: 'US',
    manager: 'Jeff Lu',
    email: 'natasha@beamery.com',
    gender: 'Female',
    stage: 'registered',
    employmentStatus: 'Permanent- FT',
    office: 'ATX',
  },
];

describe('Employee table works as expected', () => {
  it('renders a checkbox for each unique option in department', async () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummyEmployees }),
    );
    const { getAllByLabelText } = render(
      <Provider store={store}>
        <EmployeeTable />
      </Provider>,
    );
    const engineeringCheckboxes = await waitForElement(() =>
      getAllByLabelText('Engineering', { exact: false }),
    );
    const peopleCheckboxes = getAllByLabelText('People', { exact: false });

    expect(engineeringCheckboxes).toHaveLength(1);
    expect(peopleCheckboxes).toHaveLength(1);
  });
  it('shows all 15 employees before filtering', () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummyEmployees }),
    );
    const { getByText } = render(
      <Provider store={store}>
        <EmployeeTable />
      </Provider>,
    );

    expect(getByText('1-10 of 15', { exact: false }));
  });
  it('if people dept selected, engineering should not be shown', async () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummyEmployees }),
    );
    const { getAllByText, getByLabelText } = render(
      <Provider store={store}>
        <EmployeeTable />
      </Provider>,
    );

    const peopleCheckbox = await waitForElement(() =>
      getByLabelText('People', { exact: false }),
    );
    fireEvent.click(peopleCheckbox);
    const engineeringText = getAllByText('Engineering', { exact: false });
    expect(engineeringText).toHaveLength(1);
  });
  it('Typing in searchbar should filter results', async () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummyEmployees }),
    );
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <EmployeeTable />
      </Provider>,
    );

    const searchbar = getByRole('searchbox');
    const marthaLambert = await waitForElement(() =>
      getByText('Martha Lambert'),
    );
    const thomasKostrzewski = getByText('Thomas Kostrzewski');
    fireEvent.change(searchbar, { target: { value: 't' } });
    expect(marthaLambert).not.toBeInTheDocument();
    expect(thomasKostrzewski).toBeInTheDocument();
  });
  it('Checking both attributes should check the "Select all', async () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummyEmployees }),
    );
    const { getByLabelText, getAllByLabelText } = render(
      <Provider store={store}>
        <EmployeeTable />
      </Provider>,
    );

    const peopleCheckbox = await waitForElement(() =>
      getByLabelText('People', { exact: false }),
    );
    const engineeringCheckbox = getByLabelText('Engineering', { exact: false });

    const selectAllCheckbox = getAllByLabelText('Select all', {
      exact: false,
    })[0];

    expect(peopleCheckbox.checked).toEqual(false);
    expect(engineeringCheckbox.checked).toEqual(false);
    expect(selectAllCheckbox.checked).toEqual(false);

    fireEvent.click(peopleCheckbox);
    expect(peopleCheckbox.checked).toEqual(true);
    expect(engineeringCheckbox.checked).toEqual(false);
    expect(selectAllCheckbox.checked).toEqual(false);

    fireEvent.click(engineeringCheckbox);
    expect(peopleCheckbox.checked).toEqual(true);
    expect(engineeringCheckbox.checked).toEqual(true);
    expect(selectAllCheckbox.checked).toEqual(true);
  });
  it('Typing in the searchbar should reset checkboxes', async () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummyEmployees }),
    );
    const { getByLabelText, getByRole, getAllByLabelText } = render(
      <Provider store={store}>
        <EmployeeTable />
      </Provider>,
    );

    const peopleCheckbox = await waitForElement(() =>
      getByLabelText('People', { exact: false }),
    );

    const selectAllCheckbox = getAllByLabelText('Select all', {
      exact: false,
    })[0];

    expect(peopleCheckbox.checked).toEqual(false);
    expect(selectAllCheckbox.checked).toEqual(false);

    fireEvent.click(peopleCheckbox);
    expect(peopleCheckbox.checked).toEqual(true);

    const searchbar = getByRole('searchbox');
    fireEvent.change(searchbar, { target: { value: 't' } });

    expect(peopleCheckbox.checked).toEqual(true);
    expect(selectAllCheckbox.checked).toEqual(true);
  });
});

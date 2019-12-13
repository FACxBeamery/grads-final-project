import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { render, waitForElement } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/index';
import SurveyBuilderFromTemplate from './index';

const dummyResponse = [
  {
    _id: '508f1f99bcf86cd799439014',
    title: 'Graduates Onboarding',
    description:
      'A survey description that is about 1 sentence long yeah blah blah',
    status: 'draft',
    disclaimer:
      'We respect your trust and protect your privacy by never sharing this data with third parties as well as ensuring this data will be stored until the research period is over. By filling out this survey, you agree that we will process your data in line with the Beamery Privacy Policy (www.beamery.com/privacy). If you would like to chat about this policy, or if you subsequently change your mind and want us to delete your personal data, please email steven.bianchi@beamery.com.',
    dateCreated: 1573826615,
    dateEdited: 1572617513,
    dateToPublish: 1574345041,
    datePublished: '',
    dateToClose: 1576937061,
    dateClosed: '',
    anonymous: false,
    recipients: [
      {
        employeeId: '507f1f77bcf86cd799439014',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439012',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439013',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439015',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439016',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439017',
        completed: false,
      },
    ],
    questions: [
      '707f1f87bcf86dd799439011',
      '707f1f87bcf86dd799439021',
      '707f1f87bcf86dd799439121',
    ],
    responses: [],
  },
  {
    _id: '508f1f99bcf86cd799439214',
    title: 'All employees survey',
    description:
      'A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0',
    status: 'active',
    disclaimer:
      'We respect your trust and protect your privacy by never sharing this data with third parties as well as ensuring this data will be stored until the research period is over. By filling out this survey, you agree that we will process your data in line with the Beamery Privacy Policy (www.beamery.com/privacy). If you would like to chat about this policy, or if you subsequently change your mind and want us to delete your personal data, please email steven.bianchi@beamery.com.',
    dateCreated: 1572617513,
    dateToPublish: 1574259113,
    dateEdited: 1572617513,
    datePublished: 1574259113,
    dateToClose: 1576851113,
    dateClosed: '',
    anonymous: true,
    recipients: [
      {
        employeeId: '507f1f77bcf86cd799439014',
        completed: true,
      },
      {
        employeeId: '507f1f77bcf86cd799439012',
        completed: true,
      },
      {
        employeeId: '507f1f77bcf86cd799439013',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439015',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439016',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439017',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439011',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439018',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439019',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439023',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439033',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439043',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439053',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439063',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439073',
        completed: false,
      },
    ],
    questions: [
      '707f1f87bcf86dd799439011',
      '707f1f87bcf86dd799439021',
      '707f1f87bcf86dd799439121',
      '707f1f87bcf76dd789439121',
      '707f1f87bcf76dd799439121',
      '707f1f87bdf76dd799439121',
      '707f1f87bdf76dd799539126',
      '707f1f87bdf76dd799439126',
      '707f1f87bdf76dd799439127',
    ],
    responses: [
      {
        employeeId: null,
        answers: [
          {
            questionId: '707f1f87bcf86dd799439011',
            answer:
              'My first week was okay. I am just writing sentences for dummy data. Here is another sentence',
            comment: 'This is my comment on this answer',
          },
          {
            questionId: '707f1f87bcf86dd799439021',
            answer: 'meh',
            comment: null,
          },
          {
            questionId: '707f1f87bcf86dd799439121',
            answer: 'strongly agree',
            comment: 'I am commenting on this question',
          },
          {
            questionId: '707f1f87bcf76dd789439121',
            answer: 'Hi another sentence to mock data!',
          },
          {
            questionId: '707f1f87bcf76dd799439121',
            answer: 'Hi another sentence to mock data! Number 2',
          },
          {
            questionId: '707f1f87bdf76dd799439121',
            answer: 'Hi another sentence to mock data! Number 2',
          },
          {
            questionId: '707f1f87bdf76dd799539126',
            answer: 'Hi another sentence to mock data! Number 3',
          },
          {
            questionId: '707f1f87bdf76dd799439126',
            answer: 'Hi another sentence to mock data! Number 4',
          },
          {
            questionId: '707f1f87bdf76dd799439127',
            answer: 'yes',
          },
        ],
      },
      {
        employeeId: null,
        answers: [
          {
            questionId: '707f1f87bcf86dd799439011',
            answer:
              'My first week was great. I am just writing sentences for another dummy data. Here is another sentence',
            comment: 'This is my comment on this answer',
          },
          {
            questionId: '707f1f87bcf86dd799439021',
            answer: 'good',
            comment: null,
          },
          {
            questionId: '707f1f87bcf86dd799439121',
            answer: 'neutral',
            comment: 'I am commenting on this question',
          },
          {
            questionId: '707f1f87bcf76dd789439121',
            answer: '2nd response Hi another sentence to mock data!',
          },
          {
            questionId: '707f1f87bcf76dd799439121',
            answer: '2nd response Hi another sentence to mock data! Number 2',
          },
          {
            questionId: '707f1f87bdf76dd799439121',
            answer: '2nd response Hi another sentence to mock data! Number 2',
          },
          {
            questionId: '707f1f87bdf76dd799539126',
            answer: '2nd response Hi another sentence to mock data! Number 3',
          },
          {
            questionId: '707f1f87bdf76dd799439126',
            answer: '2nd response Hi another sentence to mock data! Number 4',
          },
          {
            questionId: '707f1f87bdf76dd799439127',
            answer: 'no',
          },
        ],
      },
    ],
  },
  {
    _id: '509f1f99bcf86cd799439215',
    title: 'People Team - engagement survey',
    description:
      'A survey description that is about 2 sentences long yeah blah blah this is the description. Hope you like this description! :0',
    status: 'closed',
    disclaimer:
      'We respect your trust and protect your privacy by never sharing this data with third parties as well as ensuring this data will be stored until the research period is over. By filling out this survey, you agree that we will process your data in line with the Beamery Privacy Policy (www.beamery.com/privacy). If you would like to chat about this policy, or if you subsequently change your mind and want us to delete your personal data, please email steven.bianchi@beamery.com.',
    dateCreated: 1572617513,
    dateEdited: 1572617513,
    dateToPublish: 1574259113,
    datePublished: 1574259113,
    dateToClose: 1576851113,
    dateClosed: 1576851113,
    anonymous: true,
    recipients: [
      {
        employeeId: '507f1f77bcf86cd799439011',
        completed: true,
      },
      {
        employeeId: '507f1f77bcf86cd799439019',
        completed: true,
      },
      {
        employeeId: '507f1f77bcf86cd799439023',
        completed: true,
      },
      {
        employeeId: '507f1f77bcf86cd799439033',
        completed: true,
      },
      {
        employeeId: '507f1f77bcf86cd799439043',
        completed: true,
      },
      {
        employeeId: '507f1f77bcf86cd799439063',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439073',
        completed: false,
      },
    ],
    questions: [
      '707f1f87bcf76dd789439121',
      '707f1f87bdf76dd799439126',
      '707f1f87bcf86dd799439021',
    ],
    responses: [
      {
        employeeId: '507f1f77bcf86cd799439011',
        answers: [
          {
            questionId: '707f1f87bcf76dd789439121',
            answer: 'strongly disagree',
          },
          {
            questionId: '707f1f87bdf76dd799439126',
            answer: 'no! im okay!',
          },
          {
            questionId: '707f1f87bcf86dd799439021',
            answer: 'meh',
          },
        ],
      },
      {
        employeeId: '507f1f77bcf86cd799439019',
        answers: [
          {
            questionId: '707f1f87bcf76dd789439121',
            answer: 'disagree',
          },
          {
            questionId: '707f1f87bdf76dd799439126',
            answer: 'no! im okay!',
          },
          {
            questionId: '707f1f87bcf86dd799439021',
            answer: 'bad',
          },
        ],
      },
      {
        employeeId: '507f1f77bcf86cd799439023',
        answers: [
          {
            questionId: '707f1f87bcf76dd789439121',
            answer: 'neutral',
          },
          {
            questionId: '707f1f87bdf76dd799439126',
            answer: 'no! im okay!',
          },
          {
            questionId: '707f1f87bcf86dd799439021',
            answer: 'bad',
          },
        ],
      },
      {
        employeeId: '707f1f87bcf76dd789439121',
        answers: [
          {
            questionId: '707f1f87bcf76dd789439121',
            answer: 'agree',
          },
          {
            questionId: '707f1f87bdf76dd799439126',
            answer: 'no! im oapsodmnaposmx aks xpioa scxkay!',
          },
          {
            questionId: '707f1f87bcf86dd799439021',
            answer: 'really bad',
          },
        ],
      },
      {
        employeeId: '507f1f77bcf86cd799439043',
        answers: [
          {
            questionId: '707f1f87bcf76dd789439121',
            answer: 'strongly agree',
          },
          {
            questionId: '707f1f87bdf76dd799439126',
            answer: 'no! imapiosdma sd ipkq wd !!! scxkay!',
          },
          {
            questionId: '707f1f87bcf86dd799439021',
            answer: 'good',
          },
        ],
      },
    ],
  },
  {
    _id: '5df106abae9d770014aeb728',
    title: 'asdasd',
    description: 'asdasd',
    recipients: [
      {
        employeeId: '507f1f77bcf86cd799439011',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439012',
        completed: false,
      },
    ],
    disclaimer:
      'We respect your trust and protect your privacy by never sharing this data with third parties as well as ensuring this data will be stored until the research period is over. By filling out this survey, you agree that we will process your data in line with the Beamery Privacy Policy (www.beamery.com/privacy). If you would like to chat about this policy, or if you subsequently change your mind and want us to delete your personal data, please email steven.bianchi@beamery.com.',
    anonymous: false,
    questions: ['5df106abae9d770014aeb727', '5df106f5ae9d770014aeb729'],
    dateCreated: 1576076953001,
    modalStyle: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    recipientIds: [
      {
        employeeId: '507f1f77bcf86cd799439011',
        completed: false,
      },
      {
        employeeId: '507f1f77bcf86cd799439012',
        completed: false,
      },
    ],
    status: 'draft',
    responses: [],
    dateToClose: null,
    dateClosed: null,
    dateEdited: 1576077045001,
    datePublished: null,
    dateToPublish: null,
    employeeData: [
      {
        _id: '507f1f77bcf86cd799439011',
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
        _id: '507f1f77bcf86cd799439012',
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
        _id: '507f1f77bcf86cd799439013',
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
        _id: '507f1f77bcf86cd799439014',
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
        _id: '507f1f77bcf86cd799439015',
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
        _id: '507f1f77bcf86cd799439016',
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
        _id: '507f1f77bcf86cd799439017',
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
        _id: '507f1f77bcf86cd799439018',
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
        _id: '507f1f77bcf86cd799439019',
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
        _id: '507f1f77bcf86cd799439023',
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
        _id: '507f1f77bcf86cd799439033',
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
        _id: '507f1f77bcf86cd799439043',
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
        _id: '507f1f77bcf86cd799439053',
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
        _id: '507f1f77bcf86cd799439063',
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
        _id: '507f1f77bcf86cd799439073',
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
    ],
    openCreateSurveyModal: true,
  },
];

describe('Testing Survey Builder from template', () => {
  it('should see title and table should render x buttons that will let the user duplicate', async () => {
    const mockAxiosGet = jest.spyOn(axios, 'get');
    mockAxiosGet.mockImplementation(() =>
      Promise.resolve({ data: dummyResponse }),
    );

    const { getByText, getAllByRole } = render(
      // eslint-disable-next-line react/jsx-filename-extension
      <BrowserRouter>
        <Provider store={store}>
          <SurveyBuilderFromTemplate />
        </Provider>
      </BrowserRouter>,
    );

    expect(getByText('Create Survey From Template')).toBeInTheDocument();
    expect(getByText('Use existing surveys as templates.')).toBeInTheDocument();
    const allButtons = await waitForElement(() => getAllByRole('button'));
    expect(allButtons).toHaveLength(dummyResponse.length);
    mockAxiosGet.mockRestore();
  });
});

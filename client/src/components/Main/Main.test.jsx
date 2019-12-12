import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import axios from 'axios'
import { createMemoryHistory } from 'history'
import { render, wait, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../../store';
import Main from './Main';

import dummyData from './dummyData/dummyData'


describe('Main components for un/protected routes', () => {
    const protectedPaths = [
        '/admin',
        '/admin/surveys/create',
        '/admin/surveys/edit/test',
        '/admin/surveys/template'
    ];

    let history;
    beforeEach(() => {
        history = createMemoryHistory()
    })

    protectedPaths.forEach(url => {
      it(`<Main /> route '${url}' redirects to login when no JWT token`, async () => {
        const localStorageSpy = jest.spyOn(Storage.prototype, 'getItem');
        const mockAxiosGet = jest.spyOn(axios, 'get').mockImplementation((urlMock) => {
          if (urlMock === '/admins'){
            return Promise.resolve({status: 401})
          }
          return Promise.resolve({});
        })
    
        history.push(url)
        
        const { getByText, getAllByLabelText } = render(
          <Router history={history}>
            <Provider store={store}>
              <Main />
            </Provider>
          </Router>
        );
        
        // Header exists
        expect(getByText('vibe@')).toBeInTheDocument();
        expect(getByText('Beamery')).toBeInTheDocument();
    
        // Redirected to Login
        await wait(() => getAllByLabelText('Email Address', {
            exact: false,
          }));


        expect(mockAxiosGet).toBeCalledWith("/admins", {"headers": {"Authorization": "JWT null"}})

        // A check for JWT token was done before redirect
        expect(localStorageSpy).toBeCalledWith('jwt_token')

        mockAxiosGet.mockRestore();
        localStorageSpy.mockRestore();
      
      });
    })

    it('/admin displays correctly on auth', async () => {
      const localStorageSpy = jest.spyOn(Storage.prototype, 'getItem');

      const mockAxiosGet = jest.spyOn(axios, 'get').mockImplementation((url) => {
        if (url === '/admins'){
          return Promise.resolve({status: 200})
        }
        if (url === '/surveys'){
          return Promise.resolve({ data: dummyData })
        }
        return Promise.resolve({});
      })
  
      history.push('/admin')
      
      const { getByText } = render(
        <Router history={history}>
          <Provider store={store}>
            <Main />
          </Provider>
        </Router>
      );

      expect(mockAxiosGet).toBeCalledWith("/admins", {"headers": {"Authorization": "JWT null"}})

      await wait(() => getByText('See all Surveys'));
      fireEvent.click(getByText('See all Surveys'));
      expect(getByText('See only Active and Draft Surveys')).toBeInTheDocument();

      // A check for JWT token was done
      expect(localStorageSpy).toBeCalledWith('jwt_token')


      mockAxiosGet.mockRestore();
      localStorageSpy.mockRestore();
    })
});
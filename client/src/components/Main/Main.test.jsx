import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../../store';
import Main from './Main';


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
            console.log('Testing', url)
            const spy = jest.spyOn(Storage.prototype, 'getItem');
        
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
            // A check for JWT token was done before redirect
            expect(spy).toBeCalledWith('jwt_token')
            spy.mockRestore();
        
        });
    })
  
});


import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/index';
import Dashboard from './index';

describe('Testing Dashboard', () => {
  it('should alternate between two button texts', () => {
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
    expect(getByText('See only Active Surveys')).toBeInTheDocument();
  });
  it('should alternate between two title texts', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </BrowserRouter>,
    );
    expect(getByText('All Surveys')).toBeInTheDocument();
    fireEvent.click(getByText('See only Active Surveys'));
    expect(getByText('Active Surveys')).toBeInTheDocument();
  });
});

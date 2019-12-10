import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../../../store';
import TableFilters from './TableFilters';

describe('Table Filters work as expected', () => {
  it('should display checkboxes for each attribute', () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <TableFilters />
      </Provider>,
    );

    const selectAllCheckboxes = getAllByText('Show all', { exact: false });
    expect(selectAllCheckboxes).toHaveLength(2);
  });
  it('should display a searchbar', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <TableFilters />
      </Provider>,
    );
    const searchbar = getByRole('searchbox');
    expect(searchbar).toBeInTheDocument();
  });
});

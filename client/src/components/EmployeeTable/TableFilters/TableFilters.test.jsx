import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../../../store';
import TableFilters from './TableFilters';

describe('Table Filters work as expected', () => {
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

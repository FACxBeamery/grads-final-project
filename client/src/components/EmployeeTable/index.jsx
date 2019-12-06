/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
  TablePagination,
} from '@material-ui/core';
import RecipientOptions from './TableFilters/TableFilters';

const headCells = [
  {
    id: 'name',
    disablePadding: true,
    label: 'Name',
  },
  { id: 'job-title', disablePadding: false, label: 'Job Title' },
  {
    id: 'department',
    disablePadding: false,
    label: 'Department',
  },
  { id: 'office', disablePadding: false, label: 'Office' },
  {
    id: 'start-date',
    disablePadding: false,
    label: 'Start Date',
  },
];

const EnhancedTableHead = () => {
  const { filteredEmployeeData } = useSelector(
    (state) => state.employeeTableReducer,
  );
  const recipients = useSelector(
    (state) => state.employeeTableReducer.recipientIds,
  );
  const numSelected = recipients.length;
  const dispatch = useDispatch();

  const handleSelectAllClick = (event) => {
    const checkedAndNotIndeterminate =
      event.target.checked && !event.target.indeterminate;
    const payload = { checked: checkedAndNotIndeterminate };
    dispatch({ type: 'TOGGLE_FILTERED_RECIPIENTS', payload });
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={
              numSelected > 0 && numSelected < filteredEmployeeData.length
            }
            checked={numSelected === filteredEmployeeData.length}
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'Select all employees' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'default'}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = () => {
  const recipients = useSelector(
    (state) => state.employeeTableReducer.recipientIds,
  );

  const numSelected = recipients.length;
  return (
    <Toolbar>
      {numSelected > 0 && (
        <Box
          width={1}
          display='flex'
          justifyContent='center'
          style={{ backgroundColor: '#f443361f' }}
        >
          <Typography align='center' color='inherit' variant='subtitle1'>
            {`${numSelected} selected`}
          </Typography>
        </Box>
      )}
    </Toolbar>
  );
};

const EmployeesTable = () => {
  const { filteredEmployeeData, page, rowsPerPage } = useSelector(
    (state) => state.employeeTableReducer,
  );
  const recipients = useSelector(
    (state) => state.employeeTableReducer.recipientIds,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const getEmployees = async () => {
      const { data } = await axios.get(`/employees`);
      dispatch({ type: 'SET_EMPLOYEE_DATA', payload: data });
      dispatch({ type: 'SET_FILTERED_EMPLOYEE_DATA', payload: data });
      dispatch({ type: 'SET_INTITAL_FILTER_OPTIONS' });
    };
    getEmployees();
  }, [dispatch]);

  const handleRowClick = (event, id) => {
    const payload = { id };
    dispatch({ type: 'TOGGLE_RECIPIENT', payload });
  };

  const handleChangePage = (event, newPage) => {
    const payload = { page: newPage };
    dispatch({ type: 'CHANGE_PAGE', payload });
  };

  const handleChangeRowsPerPage = (event) => {
    const payload = { rowsPerPage: event.target.value };
    dispatch({ type: 'CHANGE_ROWS_PER_PAGE', payload });
  };

  const isSelected = (id) => recipients.indexOf(id) !== -1;

  const emptyRows = filteredEmployeeData
    ? rowsPerPage -
      Math.min(rowsPerPage, filteredEmployeeData.length - page * rowsPerPage)
    : 0;

  return (
    <Box pt={2}>
      <RecipientOptions />
      {filteredEmployeeData && (
        <>
          <EnhancedTableToolbar />
          <Box>
            <Table
              aria-labelledby='tableTitle'
              size='small'
              aria-label='enhanced table'
            >
              <EnhancedTableHead />

              <TableBody>
                {filteredEmployeeData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    // eslint-disable-next-line no-underscore-dangle
                    const isItemSelected = isSelected(row._id);
                    // eslint-disable-next-line no-underscore-dangle
                    const labelId = row._id;

                    return (
                      <TableRow
                        hover
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={(event) => handleRowClick(event, row._id)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          padding='none'
                        >
                          {`${row.firstName} ${row.lastName}`}
                        </TableCell>
                        <TableCell align='right'>{row.jobTitle}</TableCell>
                        <TableCell align='right'>{row.department}</TableCell>
                        <TableCell align='right'>{row.office}</TableCell>
                        <TableCell align='right'>{row.startDate}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 33 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component='div'
            count={filteredEmployeeData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default EmployeesTable;

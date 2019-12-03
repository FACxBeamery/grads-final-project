import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
} from '@material-ui/core';

import { dummy } from './dummy';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  { id: 'job-title', numeric: true, disablePadding: false, label: 'Job Title' },
  {
    id: 'department',
    numeric: true,
    disablePadding: false,
    label: 'Department',
  },
  { id: 'office', numeric: true, disablePadding: false, label: 'Office' },
  {
    id: 'start-date',
    numeric: true,
    disablePadding: false,
    label: 'Start Date',
  },
];

function EnhancedTableHead() {
  const { recipients } = useSelector((state) => state.createSurveyReducer);
  const { rowsPerPage, employeeData } = useSelector(
    (state) => state.employeeTableReducer,
  );
  const numSelected = recipients.length;
  const dispatch = useDispatch();

  const handleSelectAllClick = (event) => {
    console.log(event.target.checked, 'CHECKED');
    console.log(event.target.indeterminate, 'INDETERMINATE');
    const checkedAndNotIndeterminate =
      event.target.checked && !event.target.indeterminate;
    const payload = { employeeData, checked: checkedAndNotIndeterminate };

    dispatch({ type: 'TOGGLE_ALL_RECIPIENTS', payload });
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowsPerPage}
            checked={numSelected === rowsPerPage}
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'Select all employees' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
  const { recipients } = useSelector((state) => state.createSurveyReducer);

  const numSelected = recipients.length;
  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography color='inherit' variant='subtitle1'>
          {`${numSelected} selected`}
        </Typography>
      ) : (
        <Typography variant='h6' id='tableTitle'>
          Employees
        </Typography>
      )}
    </Toolbar>
  );
};

export default function EnhancedTable() {
  const { employeeData, page, rowsPerPage, totalRows } = useSelector(
    (state) => state.employeeTableReducer,
  );

  const { recipients } = useSelector((state) => state.createSurveyReducer);

  const dispatch = useDispatch();

  if (!employeeData) {
    dispatch({ type: 'SET_EMPLOYEE_DATA', payload: dummy });
  }

  const handleRowClick = (event, id) => {
    const payload = { id };
    dispatch({ type: 'TOGGLE_RECIPIENTS', payload });
  };

  const handleChangePage = (event, newPage) => {
    const payload = { page: newPage };
    dispatch({ type: 'CHANGE_PAGE', payload });
    // TODO set employeedata as new page data here
  };

  const handleChangeRowsPerPage = () => {};

  const isSelected = (id) => recipients.indexOf(id) !== -1;

  const emptyRows = employeeData
    ? rowsPerPage -
      Math.min(rowsPerPage, employeeData.length - page * rowsPerPage)
    : 0;

  return (
    <Box>
      {employeeData && (
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
                {employeeData.map((row) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = row.id;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleRowClick(event, row.id)}
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
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
}

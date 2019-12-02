import React from 'react';
import PropTypes from 'prop-types';
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
  const { rowsPerPage } = useSelector((state) => state.employeeTableReducer);
  const numSelected = recipients.length;

  const handleSelectAllClick = () => {};

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
          ></TableCell>
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
  const { employeeData, page, rowsPerPage, selected } = useSelector(
    (state) => state.employeeTableReducer,
  );

  const { recipients } = useSelector((state) => state.createSurveyReducer);

  const dispatch = useDispatch();

  if (!employeeData) {
    dispatch({ type: 'SET_EMPLOYEE_DATA', payload: dummy });
  }

  const handleRowClick = (event, name) => {
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }
    // setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = () => {};

  const isSelected = (name) => selected.indexOf(name) !== -1;

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
                {employeeData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleRowClick(event, row.name)}
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
                          {row.firstName + ' ' + row.lastName}
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
            count={employeeData.length}
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

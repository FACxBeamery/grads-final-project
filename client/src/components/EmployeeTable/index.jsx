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
  TextField,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  TablePagination,
} from '@material-ui/core';

// TODO make searches reset when searchbar text
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

const EnhancedTableHead = () => {
  const { recipients, filteredEmployeeData } = useSelector(
    (state) => state.employeeTableReducer,
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
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = () => {
  const { recipients } = useSelector((state) => state.employeeTableReducer);

  const numSelected = recipients.length;
  return (
    <Toolbar>
      {numSelected > 0 ? (
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
      ) : (
        <Typography variant='h5'>Employees</Typography>
      )}
    </Toolbar>
  );
};

const OptionsCheckbox = ({ options, attribute }) => {
  const { filters } = useSelector((state) => state.employeeTableReducer);
  const dispatch = useDispatch();

  const checkAllValuesTrue = (object) => {
    return Object.values(object).every((element) => element);
  };

  const allChecked = checkAllValuesTrue(filters[attribute]);

  const handleOptionChange = (event, option) => {
    const payload = { checked: event.target.checked, option, attribute };
    dispatch({ type: 'SET_FILTER_OPTION', payload });
    dispatch({ type: 'FILTER_DATA', payload });
  };

  const handleAllFilter = (event) => {
    const payload = { checked: event.target.checked, attribute };
    dispatch({ type: 'SET_ALL_FILTER', payload });
    dispatch({ type: 'FILTER_DATA', payload });
  };

  return (
    <Box mr={4}>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>
          {attribute === 'department' ? 'Department' : 'Office'}
        </FormLabel>
        <FormGroup>
          <Box display='flex'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allChecked}
                  onChange={handleAllFilter}
                  value={allChecked}
                  name='select-all'
                  inputProps={{
                    'aria-label': 'Select all: ',
                  }}
                />
              }
              label='Select all'
            />
            {options.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters[attribute][option]}
                    onChange={
                      (event) => handleOptionChange(event, option, attribute)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                    value={option}
                  />
                }
                label={option}
              />
            ))}
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

const RecipientOptions = () => {
  const { department, office, name } = useSelector(
    (state) => state.employeeTableReducer.filters,
  );
  const dispatch = useDispatch();

  const handleSearchbarChange = (event) => {
    const payload = { text: event.target.value, attribute: 'name' };
    dispatch({ type: 'SET_SEARCHBAR_TEXT', payload });
    dispatch({ type: 'FILTER_DATA', payload });
  };

  const departmentOptions = Object.keys(department);
  const officeOptions = Object.keys(office);

  return (
    <Box display='flex'>
      <OptionsCheckbox options={departmentOptions} attribute='department' />
      <OptionsCheckbox options={officeOptions} attribute='office' />
      <TextField
        id='name-search'
        label='Search for a person'
        type='search'
        margin='normal'
        variant='outlined'
        value={name}
        onChange={handleSearchbarChange}
      />
    </Box>
  );
};

const EmployeesTable = () => {
  const { filteredEmployeeData, recipients, page, rowsPerPage } = useSelector(
    (state) => state.employeeTableReducer,
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
      Math.min(
        rowsPerPage,
        filteredEmployeeData.length - (page - 1) * rowsPerPage,
      )
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
            rowsPerPageOptions={[10, 15, 20]}
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

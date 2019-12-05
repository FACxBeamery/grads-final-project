/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
} from '@material-ui/core';

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
    let payload = { text: event.target.value };
    dispatch({ type: 'SET_SEARCHBAR_TEXT', payload });
    // Reset checkboxes when text is entered
    payload = { checked: true, attribute: 'department' };
    dispatch({ type: 'SET_ALL_FILTER', payload });
    payload = { checked: true, attribute: 'office' };
    dispatch({ type: 'SET_ALL_FILTER', payload });
    payload = { text: event.target.value, attribute: 'name' };
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

export default RecipientOptions;

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
  Typography,
  Divider,
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
                key={option}
                control={
                  <Checkbox
                    key={option}
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
    payload = { checked: false, attribute: 'department' };
    dispatch({ type: 'SET_ALL_FILTER', payload });
    payload = { checked: false, attribute: 'office' };
    dispatch({ type: 'SET_ALL_FILTER', payload });
    payload = { text: event.target.value, attribute: 'name' };
    dispatch({ type: 'FILTER_DATA', payload });
  };

  const departmentOptions = Object.keys(department);
  const officeOptions = Object.keys(office);

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='flex-start'
      pr={2}
    >
      <Box
        display='flex'
        flexDirection='column'
        style={{ backgroundColor: '#fafafa' }}
        p={1}
        pl={2}
      >
        <Box py={1}>
          <Typography variant='h5'>Filters</Typography>
        </Box>
        <Divider />
        <Box display='flex' pt={2}>
          <OptionsCheckbox
            key='department'
            options={departmentOptions}
            attribute='department'
          />
          <OptionsCheckbox
            key='office'
            options={officeOptions}
            attribute='office'
          />
        </Box>
      </Box>
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

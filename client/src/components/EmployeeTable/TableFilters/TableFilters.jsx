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
  Button,
} from '@material-ui/core';

const OptionsCheckbox = ({ options, attribute }) => {
  const { filters } = useSelector((state) => state.employeeTableReducer);
  const dispatch = useDispatch();

  const handleOptionChange = (event, option) => {
    const payload = { checked: event.target.checked, option, attribute };
    dispatch({ type: 'SET_FILTER_OPTION', payload });
    dispatch({ type: 'FILTER_DATA', payload });
  };

  return (
    <Box mr={4}>
      <FormControl component='fieldset'>
        <FormLabel style={{ fontSize: '12px' }} component='legend'>
          {attribute === 'department' ? 'Department' : 'Office'}
        </FormLabel>
        <FormGroup>
          <Box display='flex'>
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
                    value={option || ''}
                  />
                }
                label={
                  <Typography style={{ fontSize: '12px' }}>{option}</Typography>
                }
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

  const removeFilters = () => {
    dispatch({ type: 'REMOVE_FILTERS' });
    let payload = { checked: false, attribute: 'department' };
    dispatch({ type: 'SET_ALL_FILTER', payload });
    payload = { checked: false, attribute: 'office' };
    dispatch({ type: 'SET_ALL_FILTER', payload });
    payload = { text: '' };
    dispatch({ type: 'SET_SEARCHBAR_TEXT', payload });
  };

  const departmentOptions = Object.keys(department);
  const officeOptions = Object.keys(office);

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='flex-end'
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
          <Typography variant='subtitle1'>Filters</Typography>
        </Box>
        <Divider />
        <Box display='flex' flexDirection='column' pt={2}>
          <Box alignSelf='flex-end' mr={1} mb={2}>
            <Button
              onClick={removeFilters}
              size='small'
              width='auto'
              color='secondary'
            >
              Remove Filters
            </Button>
          </Box>
          <OptionsCheckbox
            key='department'
            options={departmentOptions}
            attribute='department'
          />
          <Box mt={2}>
            <OptionsCheckbox
              key='office'
              options={officeOptions}
              attribute='office'
            />
          </Box>
        </Box>
      </Box>
      <TextField
        id='name-search'
        label='Search for a person'
        type='search'
        margin='normal'
        variant='outlined'
        value={name || ''}
        onChange={handleSearchbarChange}
      />
    </Box>
  );
};

export default RecipientOptions;

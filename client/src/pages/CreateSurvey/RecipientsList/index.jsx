import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Box, Typography, Paper } from '@material-ui/core';

import { EmployeesTable } from '../../../components/EmployeeTable';

const RecipientsList = () => {
  const { openModal } = useSelector((state) => state.createSurveyReducer);
  const recipients = useSelector(
    (state) => state.employeeTableReducer.recipientIds,
  );
  const createArrayOfObjectsFromArray = (array) => {
    return array.map((item) => {
      return { employeeId: item, completed: false };
    });
  };

  const dispatch = useDispatch();
  const handleSaveRecipientsClick = () => {
    const payload = { recipients: createArrayOfObjectsFromArray(recipients) };
    dispatch({ type: 'SAVE_RECIPIENTS', payload });
    dispatch({ type: 'TOGGLE_MODAL' });
  };
  return (
    <Box my={4} alignSelf='center'>
      <Button
        onClick={() => dispatch({ type: 'TOGGLE_MODAL' })}
        color='secondary'
        variant='contained'
        size='large'
      >
        Add Recipients
      </Button>

      <Modal
        aria-labelledby='recipients-select-modal'
        open={openModal}
        onClose={() => dispatch({ type: 'TOGGLE_MODAL' })}
      >
        <Paper>
          <Box my={4} p={4}>
            <Typography variant='h4' id='simple-modal-title'>
              Recipients
            </Typography>
            <EmployeesTable />
            <Button
              variant='contained'
              color='secondary'
              onClick={handleSaveRecipientsClick}
            >
              Save selection
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default RecipientsList;

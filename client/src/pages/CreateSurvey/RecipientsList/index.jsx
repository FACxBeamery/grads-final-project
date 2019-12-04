import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Box, Typography, Paper } from '@material-ui/core';

import EmployeeTable from '../../../components/EmployeeTable';

const RecipientsList = () => {
  const { openModal } = useSelector((state) => state.createSurveyReducer);
  const { recipients } = useSelector((state) => state.employeeTableReducer);
  const dispatch = useDispatch();
  const handleSaveRecipientsClick = () => {
    const payload = { recipients };
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
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={openModal}
        onClose={() => dispatch({ type: 'TOGGLE_MODAL' })}
      >
        <Paper>
          <Box my={4} p={4}>
            <Typography variant='h4' id='simple-modal-title'>
              Recipients
            </Typography>
            <EmployeeTable />
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
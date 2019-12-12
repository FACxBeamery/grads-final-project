import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  Button,
  Box,
  Typography,
  Paper,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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

  const handleClose = () => {
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
        <Paper
          style={{
            width: '90vw',
            height: '78vh',
            transform: 'translate(6%, 20%)',
          }}
        >
          <Box p={4}>
            <Box pt={2} display='flex' justifyContent='space-between'>
              <Typography variant='h5' id='simple-modal-title'>
                Recipients
              </Typography>
              <IconButton
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              style={{
                height: '55vh',
                overflowX: 'auto',
              }}
            >
              <EmployeesTable />
            </Box>
            <Box mt={2}>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleSaveRecipientsClick}
              >
                Save selection
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default RecipientsList;

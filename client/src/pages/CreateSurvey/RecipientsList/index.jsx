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

  const dispatch = useDispatch();

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
            height: '75vh',
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
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default RecipientsList;

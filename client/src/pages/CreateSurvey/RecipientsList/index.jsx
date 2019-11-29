import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Box, Typography } from '@material-ui/core';

const RecipientsList = () => {
  const { openModal } = useSelector((state) => state.createSurveyReducer);
  const dispatch = useDispatch();
  return (
    <Box px={4}>
      <Button
        onClick={() => dispatch({ type: 'TOGGLE_MODAL' })}
        color='secondary'
      >
        Add Recipients
      </Button>
      <Modal
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={openModal}
        onClose={() => dispatch({ type: 'TOGGLE_MODAL' })}
      >
        <Box>
          <Typography variant='h4' id='simple-modal-title'>
            Recipients
          </Typography>
          {/* <Table /> */}

          {/* <RecipientsList /> */}
        </Box>
      </Modal>
    </Box>
  );
};

export default RecipientsList;

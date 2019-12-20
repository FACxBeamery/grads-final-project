import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { UPDATE_SNACKBAR } from '../../../store/actions/snackbarActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    transform: 'translate(50%, 50%)',
    left: '20%',
    top: '30%',
  },
}));
const DeleteSurveyModal = () => {
  const {
    openDeleteSurveyModal,
    surveyToDeleteId,
    surveyToDeleteTitle,
  } = useSelector((state) => state.dashboardReducer);

  const classes = useStyles();
  const dispatch = useDispatch();

  const cancelDeleteSurvey = () => {
    dispatch({ type: 'TOGGLE_DELETE_SURVEY_MODAL' });
  };

  const handleConfirmDeleteSurvey = async () => {
    try {
      const response = await axios.delete(`/surveys/${surveyToDeleteId}`);
      if (response) {
        if (response.status === 200) {
          const snackbarPayloadSent = {
            open: true,
            snackbar: {
              message: 'Survey deleted successfully',
              variant: 'success',
              timeOpened: Date.now(),
            },
          };

          dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayloadSent });
          dispatch({
            type: 'TOGGLE_DELETE_SURVEY_MODAL',
            payload: snackbarPayloadSent,
          });
        }
      }
    } catch (err) {
      const snackbarPayloadFail = {
        open: true,
        snackbar: {
          message:
            'Failed to delete survey. Refresh and try again. If this problem persists, contact the engineering team.',
          variant: 'error',
          timeOpened: Date.now(),
        },
      };
      dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayloadFail });
      dispatch({
        type: 'TOGGLE_DELETE_SURVEY_MODAL',
      });
    }
  };
  return (
    <Modal
      aria-labelledby='delete-survey-modal'
      open={openDeleteSurveyModal}
      onClose={() => dispatch({ type: 'TOGGLE_DELETE_SURVEY_MODAL' })}
    >
      <Box className={classes.paper}>
        {surveyToDeleteId && (
          <>
            <Typography variant='h5' id='simple-modal-title'>
              Are you sure you want to delete survey
              <br /> <strong>{surveyToDeleteTitle}</strong>? <br /> This action
              is irreversible
            </Typography>
            <Box mt={6} display='flex' justifyContent='space-between'>
              <Button color='primary' onClick={cancelDeleteSurvey}>
                Cancel
              </Button>
              <Button color='secondary' onClick={handleConfirmDeleteSurvey}>
                Yes
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default DeleteSurveyModal;

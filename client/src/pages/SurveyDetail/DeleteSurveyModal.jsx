import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { UPDATE_SNACKBAR } from '../../store/actions/snackbarActions';

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
const DeleteSurveyModal = ({ history }) => {
  const { openDeleteSurveyModal, _id, title } = useSelector(
    (state) => state.surveyDetailReducer,
  );

  const classes = useStyles();
  const dispatch = useDispatch();

  const cancelDeleteSurvey = () => {
    dispatch({ type: 'TOGGLE_DELETE_SURVEY_MODAL_DETAIL' });
  };

  const handleConfirmDeleteSurvey = async () => {
    try {
      const response = await axios.delete(`/surveys/${_id}`);
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
            type: 'TOGGLE_DELETE_SURVEY_MODAL_DETAIL',
            payload: snackbarPayloadSent,
          });
          history.push('/admin');
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
        type: 'TOGGLE_DELETE_SURVEY_MODAL_DETAIL',
      });
    }
  };
  return (
    <Modal
      aria-labelledby='delete-survey-modal'
      open={openDeleteSurveyModal}
      onClose={() => dispatch({ type: 'TOGGLE_DELETE_SURVEY_MODAL_DETAIL' })}
    >
      <Box className={classes.paper}>
        {_id && (
          <>
            <Typography variant='h5' id='simple-modal-title'>
              Are you sure you want to delete survey
              <br /> <strong>{title}</strong>? <br /> This action is
              irreversible
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

export default withRouter(DeleteSurveyModal);

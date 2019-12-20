import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteOutline } from '@material-ui/icons';
import axios from 'axios';

import styles from './AllSurveysTable.module.css';
import { UPDATE_SNACKBAR } from '../../../store/actions/snackbarActions';
import formatDate from '../../../utils/formatDate';
import sortArrayByObjsKey from '../../../utils/sortArrayByObjsKey';

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
const AllSurveysTable = ({ history }) => {
  const cells = [
    'Survey',
    'Description',
    'Responses',
    'Date Created',
    'Date Made Active',
    'Date Closed',
    'Status',
    '',
  ];

  const { surveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
  }));

  const goToSurveyDetail = (_id) => {
    dispatch({ type: 'RESET_EMPLOYEE_DATA' });
    history.push(`admin/surveys/${_id}`);
  };

  const handleDeleteSurvey = (id, title) => {
    dispatch({ type: 'TOGGLE_DELETE_SURVEY_MODAL' });
    const payload = { id, title };
    dispatch({ type: 'SET_DELETE_SURVEY_DATA', payload });
  };
  const sortedSurveys = sortArrayByObjsKey(surveys, 'status', 'descending');
  const dispatch = useDispatch();
  return (
    <>
      <Paper>
        <Table aria-label='all surveys table' className={styles.table}>
          <TableHead>
            <TableRow>
              {cells.map((cell, idx) => {
                // eslint-disable-next-line react/no-array-index-key
                return <TableCell key={idx}>{cell}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedSurveys.map((survey) => {
              const {
                _id,
                title,
                status,
                dateCreated,
                datePublished,
                dateClosed,
                recipients,
                responses,
                description,
              } = survey;
              return (
                <TableRow key={title} className={styles.row}>
                  <TableCell onClick={() => goToSurveyDetail(_id)} scope='row'>
                    {title}
                  </TableCell>
                  <TableCell onClick={() => goToSurveyDetail(_id)}>
                    {description}
                  </TableCell>
                  <TableCell
                    onClick={() => goToSurveyDetail(_id)}
                  >{`${responses.length}/${recipients.length} respondents`}</TableCell>
                  <TableCell onClick={() => goToSurveyDetail(_id)}>
                    {formatDate(dateCreated)}
                  </TableCell>
                  <TableCell onClick={() => goToSurveyDetail(_id)}>
                    {formatDate(datePublished) || '-'}
                  </TableCell>
                  <TableCell onClick={() => goToSurveyDetail(_id)}>
                    {formatDate(dateClosed) || '-'}
                  </TableCell>
                  <TableCell
                    onClick={() => goToSurveyDetail(_id)}
                    className={styles[status]}
                  >
                    {status}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      key='close'
                      aria-label='close'
                      color='inherit'
                      onClick={() => handleDeleteSurvey(_id, title)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <DeleteSurveyModal />
    </>
  );
};

AllSurveysTable.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(AllSurveysTable);

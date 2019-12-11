import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';

import styles from './TemplateSurveysTable.module.css';

import formatDate from '../../../utils/formatDate';
import sortArrayByObjsKey from '../../../utils/sortArrayByObjsKey';

const TemplateSurveysTable = ({ history }) => {
  const cells = [
    '',
    'Survey',
    'Description',
    'Number of questions',
    'Responses',
    'Date Published',
  ];
  const { surveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
  }));

  const dispatch = useDispatch();

  const goToSurveyBuilderWithPreexistingData = async (_id) => {
    let surveySelected;
    // eslint-disable-next-line no-underscore-dangle
    try {
      const { data } = await axios.get(`/surveys/${_id}`);
      surveySelected = data;

      surveySelected.questions = surveySelected.questions.map((question) => {
        delete question._id;
        return question;
      });
      surveySelected.recipients = surveySelected.recipients.map((recipient) => {
        return { ...recipient, completed: false };
      });
      console.log(surveySelected);
      dispatch({
        type: 'SET_SURVEY_DATA_FROM_TEMPLATE',
        payload: surveySelected,
      });
      history.push(`/admin/surveys/create`);
    } catch (error) {
      history.push('/admin/surveys');
    }
  };

  useEffect(() => {
    const getSurveys = async () => {
      try {
        const { data } = await axios.get('/surveys');
        dispatch({ type: 'SET_SURVEYS', payload: data });
      } catch (error) {
        history.push('admin/surveys');
      }
    };
    const surveysAreEmpty = !surveys.length;
    if (surveysAreEmpty) {
      getSurveys();
    }
  }, [dispatch, history, surveys]);

  const sortedSurveys = sortArrayByObjsKey(surveys, 'status', 'descending');
  return (
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
              datePublished,
              recipients,
              questions,
              responses,
              description,
            } = survey;
            return (
              <TableRow key={title} className={styles.row}>
                <TableCell scope='row'>
                  <Tooltip title='Duplicate From' aria-label='duplicatefrom'>
                    <Fab
                      onClick={() => goToSurveyBuilderWithPreexistingData(_id)}
                      color='secondary'
                    >
                      <FileCopy />
                    </Fab>
                  </Tooltip>
                </TableCell>
                <TableCell scope='row'>{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{questions.length}</TableCell>
                <TableCell>{`${responses.length}/${recipients.length} respondents`}</TableCell>
                <TableCell>{formatDate(datePublished) || 'No date'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

TemplateSurveysTable.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(TemplateSurveysTable);

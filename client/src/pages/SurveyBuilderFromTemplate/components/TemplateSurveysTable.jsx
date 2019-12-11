import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Box,
  Tooltip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import styles from './TemplateSurveysTable.module.css';

import formatDate from '../../../utils/formatDate';
import sortArrayByObjsKey from '../../../utils/sortArrayByObjsKey';

const TemplateSurveysTable = ({ history }) => {
  const cells = ['', 'Survey', 'Description', 'Responses', 'Date Published'];
  const { surveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
  }));

  const dispatch = useDispatch();

  const goToSurveyBuilderWithPreexistingData = async (id) => {
    let surveySelected;
    try {
      const { data } = await axios.get(`/surveys/${id}`);
      surveySelected = (({ _id, ...others }) => ({ ...others }))(data);

      surveySelected.questions = surveySelected.questions.map((question) => {
        return (({ _id, ...others }) => ({ ...others }))(question);
      });
      surveySelected.recipients = surveySelected.recipients.map((recipient) => {
        return { ...recipient, completed: false };
      });

      dispatch({ type: 'RESET_EMPLOYEE_DATA' });
      dispatch({ type: 'RESET_SURVEY_DATA' });
      dispatch({ type: 'RESET_CREATE_SURVEY_MODAL_STATE' });
      dispatch({
        type: 'SET_SURVEY_DATA_FROM_TEMPLATE',
        payload: surveySelected,
      });
      dispatch({
        type: 'SET_EMPLOYEE_TABLE_RECIPIENTS',
        payload: data.recipients,
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
    <Box my={4}>
      <Paper>
        <Table aria-label='all surveys table' className={styles.table}>
          <TableHead>
            <TableRow>
              {cells.map((cell, idx) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableCell style={{ fontWeight: 700 }} key={idx}>
                    {cell}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedSurveys.map((survey) => {
              const {
                title,
                datePublished,
                recipients,
                _id,
                responses,
                description,
              } = survey;
              return (
                <TableRow key={title} className={styles.row}>
                  <TableCell scope='row'>
                    <Tooltip title='Duplicate From' aria-label='duplicatefrom'>
                      <Button
                        onClick={
                          () => goToSurveyBuilderWithPreexistingData(_id)
                          // eslint-disable-next-line react/jsx-curly-newline
                        }
                      >
                        <FileCopyOutlinedIcon style={{ fontSize: 20 }} />
                      </Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell scope='row'>{title}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{`${responses.length}/${recipients.length} respondents`}</TableCell>
                  <TableCell>
                    {formatDate(datePublished) || 'No date'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

TemplateSurveysTable.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(TemplateSurveysTable);

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
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

import DeleteSurveyModal from './DeleteSurveyModal';
import styles from './AllSurveysTable.module.css';
import formatDate from '../../../utils/formatDate';
import sortArrayByObjsKey from '../../../utils/sortArrayByObjsKey';

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

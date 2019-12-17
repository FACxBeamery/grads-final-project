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
} from '@material-ui/core';

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
  ];

  const { surveys } = useSelector((state) => ({
    surveys: state.dashboardReducer.surveys,
  }));

  const sortedSurveys = sortArrayByObjsKey(surveys, 'status', 'descending');
  const dispatch = useDispatch();
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
              status,
              dateCreated,
              datePublished,
              dateClosed,
              recipients,
              responses,
              description,
            } = survey;
            return (
              <TableRow
                key={title}
                className={styles.row}
                onClick={() => {
                  dispatch({ type: 'RESET_EMPLOYEE_DATA' });
                  history.push(`admin/surveys/${_id}`);
                }}
              >
                <TableCell scope='row'>{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{`${responses.length}/${recipients.length} respondents`}</TableCell>
                <TableCell>{formatDate(dateCreated)}</TableCell>
                <TableCell>{formatDate(datePublished) || '-'}</TableCell>
                <TableCell>{formatDate(dateClosed) || '-'}</TableCell>
                <TableCell className={styles[status]}>{status}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

AllSurveysTable.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(AllSurveysTable);

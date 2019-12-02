import React from 'react';
import { withRouter } from 'react-router-dom';
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
import sortArrayByProp from '../../../utils/sortArrayByProp';

const AllSurveysTable = ({ surveys, history }) => {
  const cells = [
    'Survey',
    'Description',
    'Responses',
    'Date Published',
    'Date to Close',
    'Status',
  ];

  const sortedSurveys = sortArrayByProp(surveys, 'status', 'descending');
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
              datePublished,
              dateToClose,
              recipients,
              responses,
              description,
            } = survey;
            return (
              <TableRow
                key={title}
                className={styles.row}
                onClick={() => history.push(`admin/surveys/${_id}`)}
              >
                <TableCell scope='row'>{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{`${responses.length}/${recipients.length} respondents`}</TableCell>
                <TableCell>{formatDate(datePublished) || 'No date'}</TableCell>
                <TableCell>{formatDate(dateToClose) || 'No date'}</TableCell>
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
  // eslint-disable-next-line react/forbid-prop-types
  surveys: PropTypes.array.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(AllSurveysTable);

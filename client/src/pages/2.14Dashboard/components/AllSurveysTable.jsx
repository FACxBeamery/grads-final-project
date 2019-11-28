import React from 'react';
import { withRouter } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from './AllSurveysTable.module.css';

import formatDate from '../../../utils/formatDate';

const AllSurveysTable = ({ surveys, history }) => {
  const cells = [
    'Survey',
    'Responses',
    'Date Published',
    'Date to Close',
    'Status',
  ];
  return (
    <Table aria-label='all surveys table' className={styles.table}>
      <TableHead>
        <TableRow>
          {cells.map((cell, idx) => {
            return <TableCell key={idx}>{cell}</TableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {surveys.map((survey) => {
          const {
            _id,
            title,
            status,
            datePublished,
            dateToClose,
            recipients,
            responses,
          } = survey;
          return (
            <TableRow
              key={title}
              className={styles['row']}
              onClick={() => history.push(`admin/surveys/${_id}`)}
            >
              <TableCell scope='row'>{title}</TableCell>
              <TableCell>{`${responses.length}/${recipients.length} respondents`}</TableCell>
              <TableCell>{formatDate(datePublished) || 'No date'}</TableCell>
              <TableCell>{formatDate(dateToClose) || 'No date'}</TableCell>
              <TableCell className={styles[status]}>{status}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default withRouter(AllSurveysTable);

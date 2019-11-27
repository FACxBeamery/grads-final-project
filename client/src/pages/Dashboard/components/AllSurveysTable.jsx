import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from '../Dashboard.module.css';

const formatDate = (unix) => {
  if (unix) {
    // Convert timestamp to milliseconds
    const date = new Date(unix * 1000);

    // Year
    const year = date.getFullYear();

    // Month
    const month = date.getMonth() + 1;

    // Day
    const day = date.getDate();

    // Display date time in MM-dd-yyyy h:m:s format
    const convdataTime = `${day}/${month}/${year}`;

    return convdataTime;
  } else {
    return '';
  }
};

const AllSurveysTable = ({ surveys }) => {
  return (
    // <Paper>
    <Table aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>Survey</TableCell>
          {/* <TableCell>Title</TableCell> */}
          <TableCell>Date Published</TableCell>
          <TableCell>Date to Close</TableCell>
          <TableCell>Responses</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {surveys.map((survey) => {
          const {
            _id,
            title,
            description,
            status,
            datePublished,
            dateToClose,
            recipients,
            responses,
          } = survey;
          return (
            <TableRow key={title} className={styles['row']}>
              <TableCell component='th' scope='row'>
                {title}
              </TableCell>
              {/* <TableCell >{description}</TableCell> */}
              <TableCell>{formatDate(datePublished)}</TableCell>
              <TableCell>{formatDate(dateToClose)}</TableCell>
              <TableCell>{`${responses.length} /${recipients.length} respondents`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    // </Paper>
  );
};

export default AllSurveysTable;

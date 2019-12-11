import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';

import formatDate from '../../../utils/formatDate';

import ProgressWheel from '../../../components/ProgressWheel/ProgressWheel';

import styles from './SurveyCard.module.css';

const SurveyCard = ({ survey }) => {
  const {
    _id,
    title,
    description,
    recipients,
    responses,
    dateToClose,
    status,
  } = survey;
  const percentage = responses.length / recipients.length;
  return (
    <Grid item xs={12} sm={6} md={4} component={Card} className={styles.card}>
      <Box display='flex' flexDirection='column' justifyContent='space-between'>
        <CardContent>
          <Box display='flex' justifyContent='space-between'>
            <Typography color='textSecondary' gutterBottom variant='subtitle2'>
              SURVEY
            </Typography>
            {formatDate(dateToClose) && (
              <Typography
                color='textSecondary'
                className={styles.italic}
                gutterBottom
                variant='subtitle2'
              >
                {`Deadline: ${formatDate(dateToClose)}`}
              </Typography>
            )}
          </Box>
          <Box display='flex' justifyContent='space-between' mb={1}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6'>{title}</Typography>
              <Typography color='textSecondary' variant='body2'>
                {description}
              </Typography>
            </Box>
            <Box display='flex'>
              <ProgressWheel
                strokeWidth='10'
                sqSize='100'
                percentage={percentage || 0}
                numerator={responses.length}
                denominator={recipients.length}
              />
            </Box>
          </Box>
        </CardContent>
        <CardActions className={styles.actions}>
          <Button color='secondary' size='small'>
            <Link
              className={styles.link}
              to={{
                pathname: `/admin/surveys/${_id}`,
              }}
            >
              View
            </Link>
          </Button>
          <Button color='secondary' size='small'>
            {status === 'draft' && (
              <Link
                className={styles.link}
                to={{
                  pathname: `/admin/surveys/edit/${_id}`,
                }}
              >
                Edit
              </Link>
            )}
          </Button>
          <Chip
            label={status === 'active' ? 'Active' : 'Ready to publish'}
            className={status === 'active' ? styles.active : styles.draft}
          />
        </CardActions>
      </Box>
    </Grid>
  );
};

SurveyCard.propTypes = {
  survey: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    recipients: PropTypes.array,
    responses: PropTypes.array,
    dateToClose: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
};

export default SurveyCard;

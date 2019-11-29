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

import ProgressWheel from '../../../components/ProgressWheel/ProgressWheel';

import styles from './SurveyCard.module.css';

const SurveyCard = ({ survey }) => {
  const { _id, title, description, recipients, responses } = survey;
  const percentage = responses.length / recipients.length;
  return (
    <Grid item xs={12} sm={4} md={3} component={Card} className={styles.card}>
      <Box display='flex' flexDirection='column' justifyContent='space-between'>
        <CardContent>
          <Typography color='textSecondary' gutterBottom variant='subtitle2'>
            SURVEY
          </Typography>
          <Box display='flex' mb={1}>
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
                pathname: `admin/surveys/${_id}`,
              }}
            >
              View
            </Link>
          </Button>
          <Chip label='Active' className={styles.active} />
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
  }).isRequired,
  // history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default SurveyCard;

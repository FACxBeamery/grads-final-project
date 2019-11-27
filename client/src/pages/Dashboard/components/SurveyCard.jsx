import React from 'react';
import ProgressWheel from '../../../components/ProgressWheel/ProgressWheel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styles from '../Dashboard.module.css';
import Typography from '@material-ui/core/Typography';

const SurveyCard = ({ survey }) => {
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
  const percentage = Math.floor((responses.length / recipients.length) * 100);
  return (
    <Grid item xs={5} component={Card} className={styles.card}>
      {/* <Card> */}
      <CardContent>
        <Typography color='textSecondary' gutterBottom variant='subtitle2'>
          SURVEY
        </Typography>
        <Box container display={'flex'} justifyContent='space-between' mb={4}>
          <Typography variant='h6'>{title}</Typography>

          <ProgressWheel
            strokeWidth={'8'}
            sqSize={'80'}
            percentage={percentage || 0}
            numerator={responses.length}
            denominator={recipients.length}
          />
        </Box>
        <Typography color='textSecondary' variant='body2'>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={styles['actions']}>
        <Button color='secondary' size='small'>
          View
        </Button>
        <Chip label='Active' className={styles['active']} />
      </CardActions>
    </Grid>
  );
};

export default SurveyCard;

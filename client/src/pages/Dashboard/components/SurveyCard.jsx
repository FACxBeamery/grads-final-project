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
    <Grid item xs={4} component={Card} className={styles.card}>
      {/* <Card> */}
      <CardContent>
        <Typography color='textSecondary' gutterBottom variant='subtitle2'>
          SURVEY
        </Typography>
        {/* <Box display={'flex'}> */}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant='h5'>{title}</Typography>
            {/* <Grid item xs zeroMinWidth> */}
            <Typography color='textSecondary' variant='body2'>
              {description}
            </Typography>
            {/* </Grid> */}
          </Grid>
          <Grid item xs={2}>
            <ProgressWheel
              strokeWidth={'8'}
              sqSize={'70'}
              percentage={percentage || 0}
              numerator={responses.length}
              denominator={recipients.length}
            />
          </Grid>
        </Grid>
        {/* </Box> */}
      </CardContent>
      <CardActions className={styles['actions']}>
        <Button color='secondary' size='small'>
          View
        </Button>
        <Chip label='Active' className={styles['active']} />
      </CardActions>
      {/* </Card> */}
    </Grid>
  );
};

export default SurveyCard;

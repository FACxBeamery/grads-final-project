/* eslint-disable react/prop-types */
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Done } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '4rem',
    margin: '1rem 2rem',
    position: 'relative',
  },
  stepperContainer: {
    display: 'flex',
    width: '20rem',
    justifyContent: 'space-between',
  },
  stepDescriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  step: {
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedStepText: {
    color: '#FFF',
  },
  incompleteStepText: {
    color: theme.palette.primary.main,
  },
  connector: {
    width: '8rem',
    height: '0.125rem',
    position: 'absolute',
    top: '1.5rem',
    zIndex: '-1',
  },
  connector1: {
    left: '2.5rem',
  },
  connector2: {
    left: '10rem',
  },

  completed: {
    backgroundColor: theme.palette.secondary.main,
  },
  incomplete: {
    backgroundColor: '#e8e8e8',
  },
  active: {
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
  },
  inactive: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
  completedConnector: {
    backgroundColor: theme.palette.primary.main,
  },
  incompleteConnector: {
    backgroundColor: '#e8e8e8',
  },
  stepDescription: {
    textAlign: 'center',
    marginTop: '0.5rem',
  },
}));

const Stepper = ({ activeStep, steps }) => {
  const classes = useStyles();
  return (
    <div className={classes.rootContainer}>
      <div className={classes.stepperContainer}>
        {steps.map((step, index) => {
          const completed = index <= activeStep - 1;
          const completedConnector = index < activeStep - 1;
          const stepClassName = `${classes.step} ${
            completed ? classes.completed : classes.incomplete
          } ${index === activeStep - 1 ? classes.active : classes.inactive}`;
          const stepConnectorClassName = `${classes.connector} ${
            completedConnector
              ? classes.completedConnector
              : classes.incompleteConnector
          } ${classes[`connector${index + 1}`]}`;
          const stepTextClassName = completed
            ? classes.completedStepText
            : classes.incompleteStepText;

          return (
            <div>
              <div className={classes.stepDescriptionContainer}>
                <div className={stepClassName}>
                  {completed ? (
                    <Done className={stepTextClassName} />
                  ) : (
                    <Typography className={stepTextClassName}>
                      {index + 1}
                    </Typography>
                  )}
                </div>
                <div className={classes.stepDescription}>{step}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={stepConnectorClassName} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;

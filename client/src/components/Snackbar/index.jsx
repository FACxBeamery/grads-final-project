/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@material-ui/icons';
import { amber, green } from '@material-ui/core/colors';

import { SET_SNACKBAR_OPEN }  from '../../store/actions/snackbarActions';


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const MySnackbarContentWrapper = ({
  className,
  message,
  onClose,
  variant,
  ...other
}) => {
  const classes = useStyles1();
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <span id='client-snackbar' className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  );
};

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const CustomizedSnackbars = ({ message, variant, timeopened }) => {
  const dispatch = useDispatch();

  const { open } = useSelector((state) => state.snackbarReducer);

  useEffect(() => {
    const payload = {
      open: true,
    };
    dispatch({ type: SET_SNACKBAR_OPEN, payload });
  }, [timeopened, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    const payload = {
      open: false,
    };
    dispatch({ type: SET_SNACKBAR_OPEN, payload });
  };

  return (
    message && (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <MySnackbarContentWrapper
            onClose={handleClose}
            variant={variant}
            message={message}
          />
        </Snackbar>
      </div>
    )
  );
};

CustomizedSnackbars.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

export default CustomizedSnackbars;

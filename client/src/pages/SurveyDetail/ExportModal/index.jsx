import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Box,
  Modal,
  FormControlLabel,
  Switch,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import FileDownload from 'js-file-download';

import { UPDATE_SNACKBAR } from '../../../store/actions/snackbarActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    height: `40vh`,
    width: `50vw`,
  },
}));

const createValidFilename = (string) => {
  // currently a rough implementation that just replaces everything with an underscore, this could be refined
  const stringToFilename = string.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  return stringToFilename;
};

const downloadSurvey = async (id, anonymous, title, dispatch) => {
  try {
    const res = await axios.get(`/download/${id}/${anonymous}`);
    FileDownload(res.data, `${createValidFilename(title)}.csv`);
  } catch (error) {
    const snackbarPayload = {
      open: true,
      snackbar: {
        message: 'Error downloading CSV - Try again',
        variant: 'error',
        timeOpened: Date.now(),
      },
    };

    dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayload });
  }
};

const ExportModal = () => {
  const classes = useStyles();
  const {
    openExportModal,
    // eslint-disable-next-line no-unused-vars
    _id,
    title,
    anonymous,
    anonymousExport,
  } = useSelector((state) => state.surveyDetailReducer);
  const dispatch = useDispatch();

  return (
    <Modal
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={openExportModal}
      onClose={() => {
        dispatch({ type: 'TOGGLE_EXPORT_MODAL' });
      }}
    >
      <Box
        className={classes.paper}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        alignItems='center'
      >
        <Box display='flex' flexDirection='column'>
          <Box my={2}>
            <Box mb={1}>
              <Typography variant='h4' color='primary'>
                {'Export Survey:'}
              </Typography>
            </Box>
            <Typography variant='h5' color='primary'>
              {title}
            </Typography>
          </Box>
          <Typography>
            {anonymous
              ? 'This survey was anonymous. Exports will not contain any reference to employee'
              : 'This was an attributed survey. Choose below whether to export anonymously, or with names.'}
          </Typography>
        </Box>
        {!anonymous && (
          <Box alignSelf='flex-start'>
            <FormControlLabel
              control={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Switch
                  checked={anonymousExport}
                  onChange={() => {
                    dispatch({ type: 'TOGGLE_ANONYMOUS_EXPORT' });
                  }}
                  value='anonymous'
                  name='anonymous'
                  labelid='anonymous-switch'
                  inputProps={{ 'aria-label': 'Make survey anonymous' }}
                />
              }
              label='Anonymous export'
            />
          </Box>
        )}
        <Button
          variant='contained'
          color='secondary'
          onClick={() => downloadSurvey(_id, anonymousExport, title, dispatch)}
        >
          Export results
        </Button>
      </Box>
    </Modal>
  );
};

export default ExportModal;

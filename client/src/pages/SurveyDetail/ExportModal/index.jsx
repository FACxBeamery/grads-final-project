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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const downloadSurvey = async (id) => {
  try {
    axios({
      url: `/download/${id}?username=admin`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.csv');
      document.body.appendChild(link);
      link.click();
    });
  } catch (error) {
    // put error message here
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
        style={{ top: `50%`, left: `50%`, transform: `translate(-50%, -50%)` }}
        className={classes.paper}
      >
        <Typography variant='h4'>{`Export Survey: ${title}`}</Typography>
        <Typography>
          {anonymous
            ? 'This survey was anonymous. Exports will not contain any reference to employee'
            : 'This was an attributed survey. Choose below whether to export anonymously, or with names.'}
        </Typography>
        {!anonymous && (
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
        )}
        <Button
          variant='contained'
          color='secondary'
          onClick={() => downloadSurvey(_id)}
        >
          Export results
        </Button>
      </Box>
    </Modal>
  );
};

export default ExportModal;

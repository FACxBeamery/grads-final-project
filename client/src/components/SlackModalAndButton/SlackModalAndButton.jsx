import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Paper,
} from '@material-ui/core';

import { UPDATE_SNACKBAR } from '../../store/actions/snackbarActions';

const SlackMessageTextBox = () => {
  const dispatch = useDispatch();

  const { slackMessageText } = useSelector(
    (state) => state.surveyDetailReducer,
  );

  const handleSlackMessage = (event) => {
    dispatch({
      type: 'ADD_SLACK_MESSAGE',
      payload: event.target.value,
    });
  };

  return (
    <Box mb={2}>
      <Typography>Enter your message to the survey recipients:</Typography>
      <TextField
        data-testid='slack-message-box'
        autoFocus
        fullWidth
        required
        autoComplete='off'
        value={slackMessageText || ''}
        error={slackMessageText.length < 5}
        helperText={
          slackMessageText.length < 5
            ? 'You must provide a message to the recipients'
            : ''
        }
        margin='normal'
        key='slack-message-box'
        name='comment-text-box'
        onChange={handleSlackMessage}
      />
    </Box>
  );
};

const SlackModal = () => {
  const dispatch = useDispatch();

  const {
    openSlackModal,
    recipients,
    slackMessageText,
    _id,
    employeeDataForSlack,
  } = useSelector((state) => state.surveyDetailReducer);

  const recipientsIDs = recipients.map((recipient) => recipient.employeeId);

  const generateLink = (recipientID, surveyIdToDo) => {
    const link = `<http://localhost:3000/surveys/${surveyIdToDo}/${recipientID}>`;
    return link;
  };
  const generatedLinks = recipientsIDs.map((recipientID) =>
    generateLink(recipientID, _id),
  );

  const customMessageWithLinks = (link) => `${slackMessageText} ${link}`;

  const slackIDs = employeeDataForSlack
    // eslint-disable-next-line no-underscore-dangle
    .filter((employee) => recipientsIDs.includes(employee._id))
    .map((person) => person.slackID);

  const handleSlackMessageSubmit = (event) => {
    event.preventDefault();

    slackIDs.forEach(async (slackID, linkIndex) => {
      const message = encodeURI(
        customMessageWithLinks(generatedLinks[linkIndex]),
      );

      try {
        const response = await axios.post('/slack', { slackID, message });

        if (response) {
          if (response.status === 200) {
            const snackbarPayloadSent = {
              open: true,
              snackbar: {
                message: 'Slack message successfully sent 🎉',
                variant: 'success',
                timeOpened: Date.now(),
              },
            };

            dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayloadSent });
          }
        }
      } catch (error) {
        const snackbarPayloadFail = {
          open: true,
          snackbar: {
            message:
              'Slack message failed to send. Refresh and try again. If this problem persists, contact the engineering team.',
            variant: 'error',
            timeOpened: Date.now(),
          },
        };

        dispatch({ type: UPDATE_SNACKBAR, payload: snackbarPayloadFail });
      }
    });
  };

  return (
    <>
      <Modal
        open={openSlackModal}
        style={{
          position: 'fixed',
          zIndex: '1300',
          right: '0px',
          bottom: '0px',
          width: '40rem',
          top: '31%',
          left: '25%',
        }}
        aria-labelledby='send-slack-message-modal'
        onClose={() => dispatch({ type: 'TOGGLE_OPEN_SLACK_MODAL' })}
      >
        <Paper>
          <Box
            height='70%'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            my={2}
          >
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              my={2}
            >
              <SlackMessageTextBox />
              <Button
                variant='contained'
                color='secondary'
                onClick={handleSlackMessageSubmit}
                disabled={Boolean(slackMessageText.length < 5)}
              >
                Send Slack Invite
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>

      <Button
        onClick={() => dispatch({ type: 'TOGGLE_OPEN_SLACK_MODAL' })}
        color='secondary'
        variant='outlined'
        size='large'
      >
        Send Survey Invite
      </Button>
    </>
  );
};

export default SlackModal;

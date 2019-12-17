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
        value={slackMessageText}
        error={slackMessageText.length < 5}
        helperText={
          slackMessageText < 5
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

const SlackConfirmation = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: 'TOGGLE_OPEN_SLACK_MODAL' });
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      my={2}
    >
      <Box my={4}>
        <Typography variant='h5'>
          Your slack message has been sent!
          <span aria-label='partyemoji' role='img'>
            🎉
          </span>
        </Typography>
      </Box>
      <Button
        onClick={closeModal}
        color='secondary'
        variant='contained'
        size='large'
        my={2}
      >
        Okay
      </Button>
    </Box>
  );
};
const SlackFail = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: 'TOGGLE_OPEN_SLACK_MODAL' });
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      my={2}
    >
      <Box my={4}>
        <Typography variant='h5'>
          Your slack message failed to send due to a problem with the server.
          <span aria-label='partyemoji' role='img'>
            😭
          </span>
          Refresh and try again. If this problem persists, contact the
          engineering team.
        </Typography>
      </Box>
      <Button
        onClick={closeModal}
        color='secondary'
        variant='contained'
        size='large'
        my={2}
      >
        Okay
      </Button>
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
    slackMessageSubmission,
    slackMessageFail,
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
            dispatch({
              type: 'SLACK_MESSAGE_SUBMISSION',
            });
          }
        }
      } catch (error) {
        dispatch({
          type: 'SLACK_MESSAGE_FAIL',
        });

        // eslint-disable-next-line no-console
        console.error();
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
            {!slackMessageSubmission ? (
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
                >
                  Send Slack Invite
                </Button>
              </Box>
            ) : (
              <SlackConfirmation />
            )}
            {slackMessageFail && <SlackFail />}
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

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
    <Box my={4} p={4}>
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

const SlackModal = () => {
  const dispatch = useDispatch();

  const { openSlackModal, recipients, slackMessageText, _id } = useSelector(
    (state) => state.surveyDetailReducer,
  );
  const { employeeData } = useSelector((state) => state.employeeTableReducer);

  const recipientsIDs = recipients.map((recipient) => recipient.employeeId);

  const generateLink = (recipientID, surveyIdToDo) => {
    const link = `localhost:3000/${surveyIdToDo}/${recipientID}`;
    return link;
  };
  const generatedLinks = recipientsIDs.map((recipientID) =>
    generateLink(recipientID, _id),
  );

  const customMessageWithLinks = (link) => `${slackMessageText} ${link}`;

  const slackIDs = employeeData
    .filter((employee) => recipientsIDs.includes(employee._id))
    .map((person) => person.slackID);

  const handleSlackMessageSubmit = (event) => {
    event.preventDefault();

    slackIDs.forEach((slackID, linkIndex) => {
      const message = encodeURI(
        customMessageWithLinks(generatedLinks[linkIndex]),
      );

      axios.post('/slack', { slackID, message });
    });
  };

  const closeModal = () => {
    dispatch({ type: 'TOGGLE_CREATE_SURVEY_MODAL' });
  };
  return (
    <Box my={4} alignSelf='center'>
      <Button
        onClick={() => dispatch({ type: 'TOGGLE_OPEN_SLACK_MODAL' })}
        color='secondary'
        variant='contained'
        size='large'
      >
        Send Survey Invite
      </Button>
      <Modal
        open={openSlackModal}
        aria-labelledby='send-slack-message-modal'
        onClose={() => dispatch({ type: 'TOGGLE_OPEN_SLACK_MODAL' })}
      >
        <Paper>
          <Box my={4} p={4}>
            <SlackMessageTextBox />
            <Button
              variant='contained'
              color='secondary'
              onClick={handleSlackMessageSubmit}
            >
              Send Slack Invite
            </Button>
            <Button onClick={closeModal}>X</Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default SlackModal;

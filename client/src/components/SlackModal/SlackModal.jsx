import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Paper,
} from '@material-ui/core';
//import sendSlackMessage from "../../utils/sendSlackMessage"
const initialState = {
  openSlackModal: false,
  slackMessageText: '',
};

const miniModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_OPEN_SLACK_MODAL':
      return { ...state, openSlackModal: true };
    case 'ADD_SLACK_MESSAGE':
      return { ...state, slackMessageText: action.payload };
  }
};

const SlackMessageTextBox = () => {
  const dispatch = useDispatch();
  const { slackMessageText } = useSelector((state) => state.miniModalReducer);

  handleSlackMessage = (event) => {
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
  const { openSlackModal } = useSelector((state) => state.miniModalReducer);
  // state employees
  //state recipients
  // state surveyID = useSelector((state) => state.surveyDetailReducer.survey._id)

  const recipientsIDsArray = recipients.map(
    (recipient) => recipient.employeeId,
  );

  const generateLink = (recipientID, surveyIdToDo) => {
    const link = `localhost:3000/${surveyIdToDo}/${recipientID}`;
    return link;
  };
  const generatedLinksArray = recipientsIDsArray.map((id) =>
    generateLink(id, surveyID),
  );

  const customMessage = (linkArray) => {
    return linkArray.map((link) => `${slackMessageText} ${link}`);
  };

  const slackIDsArray = employees
    .filter((employee) => recipientsIDsArray.includes(employee._id))
    .map((person) => person.slackID);

  handleSlackMessageSubmit = (event) => {
    event.preventDefault();
    slackIDsArray.forEach((slackID, linkIndex) =>
      sendSlackMessage(slackID, customMessage(generatedLinksArray[linkIndex])),
    );
  };

  return (
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
        </Box>
      </Paper>
    </Modal>
  );
};

export default SlackModal;

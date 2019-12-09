import { React, useEffect } from 'react';

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
import sendSlackMessage from '../../utils/sendSlackMessage';

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
  const {
    openSlackModal,
    recipients,
    slackMessageText,
    employees,
    id,
  } = useSelector((state) => state.surveyDetailReducer);

  useEffect(() => {
    const getEmployees = async () => {
      const { data } = await axios.get(`/employees`);
      dispatch({ type: 'SET_EMPLOYEES', payload: data });
      getEmployees();
    };
  }, [dispatch]);

  const recipientsIDs = recipients.map((recipient) => recipient.employeeId);

  const generateLink = (recipientID, surveyIdToDo) => {
    const link = `localhost:3000/${surveyIdToDo}/${recipientID}`;
    return link;
  };
  const generatedLinks = recipientsIDs.map((recipientID) =>
    generateLink(recipientID, id),
  );

  const customMessage = (link) => {
    return link.map((link) => `${slackMessageText} ${link}`);
  };

  const slackIDs = employees
    .filter((employee) => recipientsIDs.includes(employee._id))
    .map((person) => person.slackID);

  const handleSlackMessageSubmit = (event) => {
    event.preventDefault();
    slackIDs.forEach((slackID, linkIndex) =>
      sendSlackMessage(slackID, customMessage(generatedLinks[linkIndex])),
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

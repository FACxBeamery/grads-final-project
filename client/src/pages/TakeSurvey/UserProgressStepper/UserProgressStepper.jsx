import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box } from '@material-ui/core/';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const UserProgressStepper = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.takeSurveyReducer.activeStep);
  const questions = useSelector((state) => state.takeSurveyReducer.questions);

  const activeQuestion = useSelector(
    (state) => state.takeSurveyReducer.activeQuestion,
  );
  const enableNext = useSelector((state) => state.takeSurveyReducer.enableNext);

  const numberOfSteps = questions.length + 2;
  const nextQuestion = () => {
    dispatch({ type: 'NEXT_STEP' });
    dispatch({
      type: 'SET_ACTIVE_QUESTION',
    });
    dispatch({
      type: 'DISABLE_NEXT',
    });
  };
  const previousQuestion = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
    dispatch({
      type: 'SET_ACTIVE_QUESTION',
    });
  };

  return (
    <Box>
      <MobileStepper
        variant='progress'
        position='static'
        activeStep={activeStep}
        steps={numberOfSteps}
        nextButton={
          <Button
            size='small'
            data-testid='next-button'
            onClick={nextQuestion}
            disabled={
              (activeQuestion.required === true && enableNext === false) ||
              activeStep === numberOfSteps - 1
            }
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size='small'
            data-testid='previous-button'
            onClick={previousQuestion}
            disabled={activeStep === 0}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      ></MobileStepper>
    </Box>
  );
};

export default UserProgressStepper;

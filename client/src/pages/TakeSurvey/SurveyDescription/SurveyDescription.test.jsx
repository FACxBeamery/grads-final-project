import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SurveyDescription from './SurveyDescription';
import store from '../../../store/index';

it(' test the description,title and disclaimer are rendered', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <SurveyDescription />
    </Provider>,
  );
  const SurveyDescriptionText = getByTestId('survey-description');
  const SurveyTitleText = getByTestId('survey-title');
  //  const SurveyDisclaimerText = getByTestId("survey-disclaimer)
  expect(SurveyDescriptionText).toBeInTheDocument();
  expect(SurveyTitleText).toBeInTheDocument();
});

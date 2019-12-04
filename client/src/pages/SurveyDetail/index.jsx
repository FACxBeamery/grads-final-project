import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const SurveyDetail = () => {
  const allState = useSelector((state) => state);
  console.log('STATE: ', allState);

  const dispatch = useDispatch();

  const { status, datePublished } = useSelector(
    (state) => state.createSurveyRecuder,
  );

  return <></>;
};

export default SurveyDetail;

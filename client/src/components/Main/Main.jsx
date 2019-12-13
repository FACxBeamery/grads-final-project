/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@material-ui/core';
import Header from '../Header/Header';

import AdminLogin from '../../pages/AdminLogin';
import Dashboard from '../../pages/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import EditSurvey from '../../pages/EditSurvey/index';
import SurveyDetail from '../../pages/SurveyDetail';
import SurveyBuilderFromTemplate from '../../pages/SurveyBuilderFromTemplate';
import TakeSurvey from '../../pages/TakeSurvey';
import PageNotFound from '../../pages/PageNotFound';

import addTokenToEveryRequest from '../../utils/addAuthorizationHeaderToEveryRequest';
import deleteTokenOn401StatusCodes from '../../utils/deleteTokenOn401StatusCodes';
import checkTokenIsAuth from '../../utils/checkTokenIsAuth';

const Main = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.adminLoginReducer);
  const { auth } = data;
  const { snackbar } = useSelector((state) => state.snackbarReducer);

  useEffect(() => {
    addTokenToEveryRequest();
    deleteTokenOn401StatusCodes(axios);
  });

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location, match }) => {
          return checkTokenIsAuth(dispatch, auth) && auth ? (
            <Component match={match} />
          ) : (
            <Redirect
              push
              to={{
                pathname: '/admin/login',
                state: { from: location },
              }}
            />
          );
        }}
      />
    );
  };

  const routes = [
    <Route exact key='/takesurvey' path='/takesurvey' component={TakeSurvey} />,
    <Route
      exact
      key='/admin/login'
      path='/admin/login'
      component={AdminLogin}
    />,
  ];

  const protectedRoutes = [
    <ProtectedRoute exact key='/admin' path='/admin' component={Dashboard} />,
    <ProtectedRoute
      exact
      key='/admin/surveys/create'
      path='/admin/surveys/create'
      component={CreateSurvey}
    />,
    <ProtectedRoute
      exact
      key='/admin/surveys/edit/:id'
      path='/admin/surveys/edit/:id'
      component={EditSurvey}
    />,
    <ProtectedRoute
      exact
      key={4}
      path='/admin/surveys/:id'
      component={SurveyDetail}
    />,
  ];

  return (
    <main>
      <Box>
        <Box mb={5}>
          <Header />
        </Box>
        <Box mx={4}>
          <Switch>
            {routes}
            {protectedRoutes}
          </Switch>
        </Box>
      </Box>
      {snackbar}
    </main>
  );
};

export default Main;

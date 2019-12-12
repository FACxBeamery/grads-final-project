/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@material-ui/core';
import Header from '../Header/Header';

import { CHECKING_IF_AUTHED } from '../../store/actions/mainActions';

import AdminLogin from '../../pages/AdminLogin';
import Dashboard from '../../pages/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import EditSurvey from '../../pages/EditSurvey/index';
import SurveyDetail from '../../pages/SurveyDetail';
import SurveyBuilderFromTemplate from '../../pages/SurveyBuilderFromTemplate';
import TakeSurvey from '../../pages/TakeSurvey';

import LoadingPageOrRedirect from './LoadingPageOrRedirect'

import addTokenToEveryRequest from '../../utils/addAuthorizationHeaderToEveryRequest';
import deleteTokenOn401StatusCodes from '../../utils/deleteTokenOn401StatusCodes';
import checkTokenIsAuth from '../../utils/checkTokenIsAuth';

const Main = ({ history }) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.adminLoginReducer);
  const { auth } = data;
  const { snackbar } = useSelector((state) => state.snackbarReducer);
  const { checkingIfAuthed } = useSelector((state) => state.mainReducer);

  useEffect(() => {
    addTokenToEveryRequest();
    deleteTokenOn401StatusCodes(axios);
  })

  useEffect(() => {
    if ((history.location.pathname).startsWith('/admin')){
      dispatch({ type: CHECKING_IF_AUTHED, payload: { checkingIfAuthed: true } });
      checkTokenIsAuth(dispatch, auth).then(() => 
        dispatch({ type: CHECKING_IF_AUTHED, payload: { checkingIfAuthed: false } }))
    }
  }, [auth, dispatch, history.action, history.location, history.location.key])

  
  
  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route 
        {...rest}
        render={(props) => {
          return !checkingIfAuthed && auth
          ? <Component {...props} />
          : <LoadingPageOrRedirect {...props} checkingIfAuthed={checkingIfAuthed} />
        }}
      />
      )
  }

  const routes = [
    <Route exact key='/takesurvey' path='/takesurvey' component={TakeSurvey} />,
    <Route exact key='/admin/login' path='/admin/login' component={AdminLogin} />
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
      key='/admin/surveys/template'
      path='/admin/surveys/template'
      component={SurveyBuilderFromTemplate}
    />,
    <ProtectedRoute 
      exact 
      key='/admin/surveys/:id' 
      path='/admin/surveys/:id' 
      component={SurveyDetail} 
    />
  ];

  return (
    <main>
      <Box>
        <Box mb={5}>
          <Header />
        </Box>
        <Box mx={4}>
          <Switch>
            { routes}
            { protectedRoutes }
          </Switch>
        </Box>
      </Box>
      {snackbar}
    </main>
  );
};

export default withRouter(Main);

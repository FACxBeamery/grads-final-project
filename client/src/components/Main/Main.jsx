/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@material-ui/core';
import Header from '../Header/Header';
import PageNotFound from '../../pages/PageNotFound';
import LoadingPageOrRedirect from './LoadingPageOrRedirect';
import { routes, protectedRoutes } from './routes';

import Snackbar from '../Snackbar'

import addTokenToEveryRequest from '../../utils/addAuthorizationHeaderToEveryRequest';
import deleteTokenOn401StatusCodes from '../../utils/deleteTokenOn401StatusCodes';
import checkTokenIsAuth from '../../utils/checkTokenIsAuth';
import { CHECKING_IF_AUTHED } from '../../store/actions/mainActions';

const Main = ({ history }) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.adminLoginReducer);
  const { auth } = data;
  const { checkingIfAuthed } = useSelector((state) => state.mainReducer);

  useEffect(() => {
    addTokenToEveryRequest();
    deleteTokenOn401StatusCodes(axios);
  });

  useEffect(() => {
    if (history.location.pathname.startsWith('/admin')) {
      dispatch({
        type: CHECKING_IF_AUTHED,
        payload: { checkingIfAuthed: true },
      });
      checkTokenIsAuth(dispatch, auth).then(() =>
        dispatch({
          type: CHECKING_IF_AUTHED,
          payload: { checkingIfAuthed: false },
        }),
      );
    }
  }, [auth, dispatch, history.action, history.location, history.location.key]);

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => {
          return !checkingIfAuthed && auth ? (
            <Component {...props} />
          ) : (
            <LoadingPageOrRedirect
              {...props}
              checkingIfAuthed={checkingIfAuthed}
            />
          );
        }}
      />
    );
  };

  const routesMap = routes.map((rProps) => (
    <Route exact key={rProps.path} {...rProps} />
  ));
  const protectedRoutesMap = protectedRoutes.map((prProps) => (
    <ProtectedRoute exact key={prProps.path} {...prProps} />
  ));
  const { message, variant, timeOpened } = useSelector(
    (state) => state.snackbarReducer.snackbar,
  );
  const { open } = useSelector((state) => state.snackbarReducer);

  return (
    <main>
      <Box>
        <Box mb={5}>
          <Header />
        </Box>
        <Box mx={4}>
          <Switch>
            {routesMap}
            {protectedRoutesMap}
            <Route component={PageNotFound} />

          </Switch>
        </Box>
      </Box>
      {open && (
        <Snackbar message={message} variant={variant} timeopened={timeOpened} />
      )}
    </main>
  );
};

export default withRouter(Main);

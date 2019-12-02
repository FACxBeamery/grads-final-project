import React from 'react';
<<<<<<< HEAD
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
=======
// import { useSelector } from 'react-redux';
// import { Switch, Route, Redirect } from 'react-router-dom';

import { Switch, Route } from 'react-router-dom';
>>>>>>> master
import { Box } from '@material-ui/core';
import AdminLogin from '../../pages/AdminLogin';
import Dashboard from '../../pages/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import SurveyDetail from '../../pages/SurveyDetail';
import TakeSurvey from '../../pages/TakeSurvey';

const Main = () => {
<<<<<<< HEAD
  const { data } = useSelector((state) => state.adminLoginReducer);
  const { auth } = data;
  const { snackbar } = useSelector((state) => state.snackbarReducer);
=======
  // const { auth } = useSelector((state) => state.adminLoginReducer);
  // const snackbar = useSelector((state) => state.snackbarReducer);
>>>>>>> master

  return (
    <main>
      <Box mx={4}>
        <Switch>
          <Route exact path='/admin/login'>
            {auth ? <Redirect to='/admin' /> : <AdminLogin />}
          </Route>
          <Route exact path='/admin' component={Dashboard} />
          <Route exact path='/admin/surveys/create' component={CreateSurvey} />
          <Route path='/admin/surveys/:id' component={SurveyDetail} />
          <Route path='/:id' component={TakeSurvey} />
        </Switch>
      </Box>
<<<<<<< HEAD
      {snackbar}
=======
>>>>>>> master
    </main>
  );
};

export default Main;

import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Header from '../Header/Header';
import AdminLogin from '../../pages/AdminLogin';
import Dashboard from '../../pages/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import EditSurvey from '../../pages/EditSurvey/index';
import SurveyDetail from '../../pages/SurveyDetail';
import SurveyBuilderFromTemplate from '../../pages/SurveyBuilderFromTemplate';
import TakeSurvey from '../../pages/TakeSurvey';

const Main = () => {
  const { data } = useSelector((state) => state.adminLoginReducer);
  const { auth } = data;
  const { snackbar } = useSelector((state) => state.snackbarReducer);
  return (
    <main>
      <Box>
        <Box mb={5}>
          <Header />
        </Box>
        <Box mx={4}>
          <Switch>
            <Route exact path='/admin/login'>
              {auth ? <Redirect to='/admin' /> : <AdminLogin />}
            </Route>
            <Route exact path='/admin' component={Dashboard} />
            <Route
              exact
              path='/admin/surveys/create'
              component={CreateSurvey}
            />
            <Route
              exact
              path='/admin/surveys/edit/:id'
              component={EditSurvey}
            />
            <Route
              exact
              path='/admin/surveys/template'
              component={SurveyBuilderFromTemplate}
            />
            <Route exact path='/admin/surveys/:id' component={SurveyDetail} />
            <Route exact path='/surveys/:surveyId/:employeeId' component={TakeSurvey} />
          </Switch>
        </Box>
      </Box>
      {snackbar}
    </main>
  );
};

export default Main;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Header from '../Header/Header';
import AdminLogin from '../../pages/AdminLogin';
import Dashboard from '../../pages/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import EditSurvey from '../../pages/EditSurvey/index';
import SurveyDetail from '../../pages/SurveyDetail';
import TakeSurvey from '../../pages/TakeSurvey';

const Main = () => {
  return (
    <main>
      <Box>
        <Box mb={5}>
          <Header />
        </Box>
        <Box mx={4}>
          <Switch>
            <Route exact path='/admin/login' component={AdminLogin} />
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
            <Route path='/admin/surveys/:id' component={SurveyDetail} />
            <Route path='/:id' component={TakeSurvey} />
          </Switch>
        </Box>
      </Box>
    </main>
  );
};

export default Main;

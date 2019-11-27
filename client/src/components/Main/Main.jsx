import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLogin from '../../pages/AdminLogin';
import Dashboard from '../../pages/Dashboard/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import SurveyDetail from '../../pages/SurveyDetail';
import TakeSurvey from '../../pages/TakeSurvey';
import Box from '@material-ui/core/Box';

const Main = () => {
  return (
    <main>
      <Box mx={4}>
        <Switch>
          <Route exact path='/admin/login' component={AdminLogin} />
          <Route exact path='/admin' component={Dashboard} />
          <Route exact path='/admin/surveys/create' component={CreateSurvey} />
          <Route path='/admin/surveys/:id' component={SurveyDetail} />
          <Route path='/:id' component={TakeSurvey} />
        </Switch>
      </Box>
    </main>
  );
};

export default Main;

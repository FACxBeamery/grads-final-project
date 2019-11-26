import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLogin from '../../pages/AdminLogin';
import Dashboard from '../../pages/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import SurveyDetail from '../../pages/SurveyDetail';
import TakeSurvey from '../../pages/TakeSurvey';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/admin/login' component={AdminLogin} />
        <Route exact path='/admin' component={Dashboard} />
        <Route exact path='/admin/surveys/create' component={CreateSurvey} />
        <Route path='/admin/surveys/:id' component={SurveyDetail} />
        <Route path='/:id' component={TakeSurvey} />
      </Switch>
    </main>
  );
};

export default Main;

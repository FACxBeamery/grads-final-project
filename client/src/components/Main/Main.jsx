import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLogin from '../../pages/AdminLogin';
// import Dashboard from '../../pages/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import SurveyDetail from '../../pages/SurveyDetail';
import TakeSurvey from '../../pages/TakeSurvey';

const Main = () => {
  const { auth } = useSelector((state) => state.adminLoginReducer);
  const snackbar = useSelector((state) => state.snackbarReducer);

  return (
    <main>
      <Switch>
        <Route exact path='/admin/login'>
          {auth ? <Redirect to='/admin/dashboard' /> : <AdminLogin />}
        </Route>
        {/* <Route exact path='/admin' component={Dashboard} /> */}
        <Route exact path='/admin/surveys/create' component={CreateSurvey} />
        <Route path='/admin/surveys/:id' component={SurveyDetail} />
        <Route path='/:id' component={TakeSurvey} />
      </Switch>
      {snackbar}
    </main>
  );
};

export default Main;

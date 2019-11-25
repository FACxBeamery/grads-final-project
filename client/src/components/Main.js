import React from "react";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateSurvey from "../pages/CreateSurvey/CreateSurvey";
import SurveyDetail from "../pages/SurveyDetail/SurveyDetail";
import TakeSurvey from "../pages/TakeSurvey/TakeSurvey";

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/admin/login" component={AdminLogin} />
                <Route exact path="/admin" component={Dashboard} />
                <Route
                    exact
                    path="/admin/surveys/create"
                    component={CreateSurvey}
                />
                <Route path="/admin/surveys/:id" component={SurveyDetail} />
                <Route path="/:id" component={TakeSurvey} />
            </Switch>
        </main>
    );
};

export default Main;

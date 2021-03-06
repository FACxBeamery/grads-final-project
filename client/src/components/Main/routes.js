import AdminLogin from '../../pages/AdminLogin';
import Dashboard from '../../pages/Dashboard';
import CreateSurvey from '../../pages/CreateSurvey';
import EditSurvey from '../../pages/EditSurvey/index';
import SurveyDetail from '../../pages/SurveyDetail';
import SurveyBuilderFromTemplate from '../../pages/SurveyBuilderFromTemplate';
import TakeSurvey from '../../pages/TakeSurvey';

export const routes = [
  { path: '/surveys/:surveyId/:employeeId', component: TakeSurvey },
  { path: '/admin/login', component: AdminLogin },
];

export const protectedRoutes = [
  { path: '/admin', component: Dashboard },
  { path: '/admin/surveys/create', component: CreateSurvey },
  { path: '/admin/surveys/edit/:id', component: EditSurvey },
  { path: '/admin/surveys/template', component: SurveyBuilderFromTemplate },
  { path: '/admin/surveys/:id', component: SurveyDetail },
];

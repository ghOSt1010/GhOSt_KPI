import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

/*Component import*/
import Settings from '../views/Settings/Settings';
import Projects from '../views/Projects/Projects';
import Reports from '../views/Reports/Reports';
import AdminPanel from '../views/AdminPanel/AdminPanel';
import Dashboards from '../views/Dashboards/Dashboards';
import KPIs from '../views/KPIs/KPIs';
import Employees from '../views/Employees/Employees';
import Teams from '../views/Teams/Teams';
import Route404 from './Route404.jsx';

import Login from '../views/Login/Login';
import Home from '../views/Home/Home';

export default class Routes extends Component {
   render() {
      return (
         <Router>
            <Switch>
               <Route exact path='/' component={Login} />
               <Route exact path='/Login/' component={Login} />
               <PrivateRoute exact path='/Home' home component={Home} />
               <PrivateRoute exact path='/Dashboards/' component={Dashboards} />
               <PrivateRoute exact path='/Projects/' component={Projects} />
               <PrivateRoute exact path='/KPIs/' component={KPIs} />
               <PrivateRoute exact path='/Employees/' component={Employees} />
               <PrivateRoute exact path='/Teams/' component={Teams} />
               <PrivateRoute exact path='/Reports/' component={Reports} />
               <PrivateRoute exact path='/Settings/' component={Settings} />
               <PrivateRoute exact path='/AdminPanel/' component={AdminPanel} />

               <Route from='*' to='/' component={Route404} />
            </Switch>
         </Router>
      );
   }
}

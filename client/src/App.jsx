/*Imports*/
import React, { Component } from 'react';
import Routes from './Routes/Routes';

/*CSS import*/
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

/**
 *    Testing BlueprintUI
 */
import { FocusStyleManager } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

/**
 *    Global UI Manager for theme switching
 */
import UIManager from './Modules/UIManager/UIManager';

/*CSS import - theming : BOOTSTRAP*/
import './custom.css'; //<- Custom Bootstrap .css
import './blueprint_custom.css'; //<- Custom Blueprintjs.css
import './blueprint_custom_table.css'; //<- Custom Blueprintjs.table
import './blueprint_custom_datetime.css'; //<- Custom Blueprintjs.datetime
import './apexchart_custom.css'; //<- Custom ApexChart.js css

export default class App extends Component {
   render() {
      document.body.className =
         UIManager.getTheme() === 'dark' ? 'bp3-dark' : 'bp3-body';
      FocusStyleManager.onlyShowFocusOnTabs();
      return (
         <div className='App'>
            <Routes />
         </div>
      );
   }
}

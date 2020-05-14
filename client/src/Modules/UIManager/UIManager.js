/**
 *    UIManager controls the user specific preferences in local storage
 *    ver:  0.0.1
 *    info: init release
 */

import { defaults } from 'react-chartjs-2';

class UIManager {
   /**
    * Save user theme in local storage
    *
    * @param {String} theme
    */
   static setTheme(theme) {
      var t = theme.toLowerCase();
      if (t === 'dark' || t === 'light') {
         localStorage.setItem('theme', t);
      }
   }

   /**
    * Get user theme from local storage and set default theme if no theme selected
    *    -- set light theme if no theme is set
    *    -- return theme as {String}
    * @returns {String} light || dark
    *
    */
   static getTheme() {
      if (!this.isThemeSet()) this.setTheme('light');
      return localStorage.getItem('theme');
   }

   /**
    * Check if theme is saved in local storage
    * @returns {boolean} if light or dark theme is set
    */
   static isThemeSet() {
      return localStorage.getItem('theme') !== null;
   }

   /**
    *    Apply Selected theme
    *       -- keeps selection in localstorage
    *       -- theme can be selected by setTheme(theme) method
    *       -- apply CSS class to 'bp3-dark' || 'bp3-body' to <body></body> tag
    *       -- idea of BLUEPRINTJS UI framework
    * @returns {void}
    */
   static applySelectedTheme() {
      document.body.className =
         UIManager.getTheme() === 'dark' ? 'bp3-dark' : 'bp3-body';
   }

   /**
    * Switch doc theme based on selection :
    *    -- dark
    *    -- light
    *
    * @returns {void}
    */
   static swtichTheme() {
      if (this.isDarkThemeEnabled()) {
         this.setTheme('light');
      } else {
         this.setTheme('dark');
      }
      this.applySelectedTheme();
      this.setChartView();
      if (this.getCurrentView() === 'dashboards') {
         window.location.reload();
      }
   }

   /**
    *    @returns {Boolean} if dark theme is set
    */
   static isDarkThemeEnabled() {
      var th = this.getTheme();
      if (th === 'dark') {
         return true;
      }
      return false;
   }

   /**
    * @returns {Boolean} if light theme is set
    */
   static isLightThemeEnabled() {
      return !this.isDarkThemeEnabled();
   }

   static setChartView() {
      var theme = this.getTheme();
      if (theme === 'dark') {
         defaults.global.defaultFontColor = 'lightgray';
         defaults.global.legend.fontColor = 'white';
      }
      if (theme === 'light') {
         defaults.global.defaultFontColor = 'black';
         defaults.global.legend.fontColor = 'black';
      }
   }

   static setCurrentView(view) {
      localStorage.setItem('view', view);
   }
   static getCurrentView() {
      let v = localStorage.getItem('view');
      if (v == null) {
         var _v = window.location.pathname.toString();
         _v = _v.slice(1, _v.length);
         return _v.toLocaleLowerCase();
      }
   }
}

export default UIManager;

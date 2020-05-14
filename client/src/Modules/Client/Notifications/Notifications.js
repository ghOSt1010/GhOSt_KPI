import { Toaster } from '@blueprintjs/core';

const doToast = Toaster.create({
   className: '',
   position: 'top-right',
   maxToasts: 10
});

export default class Notifications {
   static simple(message) {
      doToast.show({ message: message });
   }
   static success(message) {
      doToast.show({
         message: message,
         intent: 'none',
         icon: 'tick',
         className: 'border border-success'
      });
   }
   static alert(message) {
      doToast.show({
         message: message,
         intent: 'none',
         icon: 'warning-sign',
         className: 'border border-warning'
      });
   }
   static failure(message) {
      doToast.show({
         message: message,
         intent: 'none',
         icon: 'delete',
         className: 'border border-danger'
      });
   }
   static error(message) {
      doToast.show({
         message: message,
         intent: 'none',
         icon: 'issue',
         className: 'border border-danger'
      });
   }
   static custom(message, intent, icon, timeout, class_name) {
      doToast.show({
         message: message,
         intent: intent,
         icon: icon,
         timeout: timeout,
         className: class_name
      });
   }
}

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
         intent: 'success',
         icon: 'tick'
      });
   }
   static alert(message) {
      doToast.show({
         message: message,
         intent: 'warning',
         icon: 'warning-sign'
      });
   }
   static failure(message) {
      doToast.show({
         message: message,
         intent: 'danger',
         icon: 'delete'
      });
   }
   static error(message) {
      doToast.show({
         message: message,
         intent: 'danger',
         icon: 'issue'
      });
   }
   static custom(message, intent, icon, timeout) {
      doToast.show({
         message: message,
         intent: intent,
         icon: icon,
         timeout: timeout
      });
   }
}

const logger = require('../logger/logger');

class AppError extends Error {
   constructor(message, errorObject = null) {
      super(message);
      this.message = message;
      this.__log();
   }

   __log() {
      logger.error('Error', this);
   }
}

function wywal() {
   throw new Error('jakis blad funkcji wywal()');
}

try {
   wywal();
} catch (err) {
   let e = new AppError('some error found', err);
   console.log(err instanceof AppError);
}

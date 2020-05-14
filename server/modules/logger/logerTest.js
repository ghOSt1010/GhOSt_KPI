const logger = require('./logger');

let obj = {
   name: 'myname',
   info: 'someInfo',
};

//logger.emoji = true;
logger.pringAppLogo();
logger.emoji = true;
console.log('Object test');
logger.info('info', obj);
logger.warning('warning', obj);
logger.error('error', obj);
logger.success('success', obj);
logger.critical('critical', obj);
logger.important('important', obj);

console.log('string test');

let info = 'some info';
logger.info('info', info);
logger.warning('warning', info);
logger.error('error', info);
logger.success('success', info);
logger.critical('critical', info);
logger.important('important', info);

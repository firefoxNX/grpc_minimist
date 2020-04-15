const grpc = require('grpc');
const healthMessages = require('./health_pb');
const healthServices = require('./health_grpc_pb');

const healthCheck = () => {
  let healthClient = new healthServices.HealthClient('localhost:9001', grpc.credentials.createInsecure());
  const healthReq = new healthMessages.HealthCheckRequest();
  return new Promise((resolve, reject) => {
    healthClient.check(healthReq, ((error, healthResponse) => {
      if (error) {
        return reject(error);
      }
      console.debug('Response from healthcheck = ' + healthResponse);
      resolve(healthResponse);
    }));
  });
}

(async function () {
  await healthCheck();
})();

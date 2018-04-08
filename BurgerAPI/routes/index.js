const borneRouter = require('./borne');
const RouterManager = function() { };

RouterManager.attach = function(app) {
  app.use('/borne', borneRouter);
};

module.exports = RouterManager;

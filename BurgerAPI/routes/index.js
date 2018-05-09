
const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/menu' , require('./menu'));
  app.use('/ingredient', require('./ingredient'));
  app.use('/product', require('./product'));
  app.use('/promotion', require('./promotion'));
};

module.exports = RouteManager;

const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/menu' , require('./menu'));
  app.use('/ingredient', require('./ingredient'));
  app.use('/product', require('./product'));
  app.use('/promotion', require('./promotion'));
  app.use('/user', require('./user'));
  app.use('/order', require('./order'));
};

module.exports = RouteManager;
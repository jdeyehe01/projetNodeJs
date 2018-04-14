const RouteManager = function() { };

RouteManager.attach = function(app) {
  app.use('/ingredient', require('./ingredient'));
  app.use('/produit', require('./produit'));
  app.use('/boisson' , require('./boisson'));
};

module.exports = RouteManager;


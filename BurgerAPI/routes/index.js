const RouteManager = function() { };

RouteManager.attach = function(app) {
  //app.use('/borne', require('./borne'));
  app.use('/ingredient', require('./ingredient'));
  app.use('/produit', require('./produit'));
};

module.exports = RouteManager;

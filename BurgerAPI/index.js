const express = require('express');
const RouterManager = require('./routes');

const app = express();

RouterManager.attach(app);

app.listen(8080, () => {
  console.log('Server started on 8080...');
});

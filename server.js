const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const models = require('./models');
const routes = require('./routes/api.js')
const PORT = process.env.PORT || 3000;

app.use('/', routes);

app.use(express.static('logic'));
app.use(express.static('css'));
app.use(express.static('emoji'));

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

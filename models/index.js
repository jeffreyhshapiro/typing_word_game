const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config();
var env = process.env.NODE_ENV || "development";

dbOptions = {
  dialect: 'postgres',
  protocol: 'postgres',
}

const dbUrl = process.env.DB_URL;

db = {};

let sequelize = new Sequelize(process.env.DB_URL, dbOptions);

// sequelize.authenticate().then(() => {
//   console.log('working')
// }).catch((err) => {
//   console.log(`Unable to connect to database: ${err}`);
// });

let files = fs.readdirSync(process.cwd()+"/models");

files.forEach((file) => {
  if (file !== 'index.js') {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  }
});

// Don't need this yet, but certainly will
// Object.keys(db).forEach(function(modelName) {
//   if ("associate" in db[modelName]) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

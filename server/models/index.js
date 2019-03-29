'use strict';


const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Project = require('./project')(sequelize, Sequelize);
db.Equipment = require('./equipment')(sequelize, Sequelize);

db.User.hasMany(db.Project, { foreignKey: '', sourceKey: '' });

module.exports = db;

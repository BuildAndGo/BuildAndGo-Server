const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Inventory = require('./inventory');
const Part = require('./part');
const Type = require('./type');

User.belongsToMany(Part, { through: Inventory })
Type.hasMany(Part);
Part.belongsTo(Type);

module.exports = {
  User,
  Inventory,
  Part,
  Type,
}

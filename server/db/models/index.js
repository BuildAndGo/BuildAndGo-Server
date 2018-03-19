const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Inventory = require('./inventory');
const Part = require('./part');
const Type = require('./type');

InventoryList = db.define('inventory_list', {
  role: Sequelize.ARRAY(Sequelize.STRING)
});

User.hasOne(Inventory);
Part.belongsToMany(Inventory, {through: InventoryList});
Type.hasMany(Part);
// Inventory.hasMany(part)

module.exports = {
  User,
  Inventory,
  Part,
  Type,
  InventoryList
}

const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Inventory = require('./inventory');
const Part = require('./part');
const Type = require('./type');

InventoryList = db.define('inventory_list', {
  quantity: Sequelize.INTEGER
});

User.hasOne(Inventory);
Part.belongsToMany(Inventory, {through: InventoryList});
Inventory.belongsToMany(Part, { through: InventoryList });
Type.hasMany(Part);

module.exports = {
  User,
  Inventory,
  Part,
  Type,
  InventoryList
}

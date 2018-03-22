const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');
const Inventory = require('./inventory');
const Part = require('./part');
const Type = require('./type');

// InventoryList = db.define('inventory_list', {
//   quantity: Sequelize.INTEGER
// });

// User.belongsTo(Inventory);
// User.hasOne(Inventory);
// Inventory.belongsTo(User);
// Part.belongsToMany(Inventory, {through: InventoryList});
// Inventory.belongsToMany(Part, { through: "InventoryList" });
// Inventory.hasMany(Part);
// Part.belongsToMany(User, { through: Inventory})
User.belongsToMany(Part, { through: Inventory})
Type.hasMany(Part);

module.exports = {
  User,
  Inventory,
  Part,
  Type,
  // InventoryList
}

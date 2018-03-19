const User = require('./user');
const Inventory = require('./inventory');
const Part = require('./part');
const Type = require('./type');

User.hasOne(Inventory);
Inventory.hasMany(Part);
Type.hasMany(Part);

module.exports = {
  User,
  Inventory,
  Part,
  Type
}

const Sequelize = require('sequelize');
const db = require('../db');

const Inventory = db.define('inventory', {
    quantity: {
        type: Sequelize.INTEGER,
    }
});

 //leaving off getter methods for the userId and partsId

module.exports = Inventory;
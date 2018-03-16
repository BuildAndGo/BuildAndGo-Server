const Sequelize = require('sequelize');
const db = require('../db');

const Type = db.define('type', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantityNeeded: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Type;
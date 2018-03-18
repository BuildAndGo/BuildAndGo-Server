const Sequelize = require('sequelize');
const db = require('../db');

const Part = db.define('part', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

 //leaving off a getter method for the typeId

module.exports = Part;
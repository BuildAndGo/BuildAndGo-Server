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
        type: Sequelize.ENUM(1, 2, 3, 4, 5),
        allowNull: false
    }
});

 //leaving off a getter method for the typeId

module.exports = Part;
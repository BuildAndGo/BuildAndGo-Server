const Sequelize = require('sequelize');
const db = require('../db');
const Type = require ('./type')


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
},
{
    defaultScope: {
        include: [{ model: Type }]
    }
}
);

module.exports = Part;

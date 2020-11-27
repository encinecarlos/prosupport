const Sequelize = require('sequelize');

const context = new Sequelize('prosupport', 'root', 'c4rl0sal3x;', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = context;

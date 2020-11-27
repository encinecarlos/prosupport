const sequelize = require('sequelize');
const context = require('./dataContext');

const Ticket = context.define('Tickets', {
    ticketNumber: {
        type: sequelize.STRING,
        allowNull: false
    },
    ticketPriority: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
        allowNull: false
    },
    ticketStatus: {
        type: sequelize.BOOLEAN,
        allowNull: false
    }
});

Ticket.sync({force: false});

module.exports = Ticket;

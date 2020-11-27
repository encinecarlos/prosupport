const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const Context = require('./data/dataContext');
const Ticket = require('./data/Ticket');
const {v4: codev4} = require('uuid');

Context.authenticate()
    .then(() => console.log('ok'))
    .catch(error => console.log(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());

app.get('/', (req, res) => {
    Ticket.findAll({
        raw: true,
        order: [['ticketStatus', 'desc']]
    }).then((tickets) => {
        res.render('index', {
            tickets: tickets
        });
    });
});

app.get('/ticket/new', (req, res) => {
    res.render('add');
});

app.post('/ticket/save', (req, res) => {
    let title = req.body.title;
    let priority = req.body.priority;
    let description = req.body.description;
    let code = codev4();

    Ticket.create({
        ticketNumber: code,
        title: title,
        ticketPriority: priority,
        description: description,
        ticketStatus: 1
    }).then(() => res.redirect('/'));
});

app.get('/ticket/:id', (req, res) => {
    let id = req.params.id;
    Ticket.findOne({
        where: {id: id}
    }).then((ticket) => {
        res.render('show', {
            ticket: ticket
        });
    });
});

app.get('/ticket/changestatus/:id', (req, res) => {
    let id = req.params.id;

    Ticket.findOne({
        attributes: ['id', 'ticketStatus'],
        where: {id: id}
    }).then(ticket => {
        Ticket.update({
            ticketStatus: (ticket.ticketStatus == 0 ? 1 : 0)
        }, {
            where: {id: ticket.id}
        }).then(() => {
            res.redirect('/ticket/' + ticket.id);
        });
    });
});

app.listen(8000, () => console.log('server running...'));

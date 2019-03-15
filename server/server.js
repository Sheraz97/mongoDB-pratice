var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { user } = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        console.log('then');
        res.status(200).send(doc);
    }, (err) => {
        console.log('err');
        res.status(400).send(err);
    })
});

// app.get

app.listen(3000, () => {
    console.log('Server running on port 3000');
})
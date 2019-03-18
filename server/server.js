var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/users');

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;
    //validate the id
    if(ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    //remove todo by id
    Todo.findByIdAndRemove(id)
    .then((todo) => {   //success
        if(!todo) {     //if no doc, send 404
            return res.status(404).send();
        }
        res.send(todo);   //if doc send doc back with status 200
    })
    .catch((err) => {   //error
        res.status(400).send(); //400 with empty body
    })
})

app.post('/users', (req, res) => {
    // console.log('req.body: ', req.body);
    var _user = new user({
        email: req.body.email,
        password: req.body.password,
        token: req.body.token
    })
    _user.save()
    .then(() => {
        // console.log('_user.save.then ==> user', user)
        // res.send(user);
        return _user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(_user);
        // console.log('final', _user)
        // res.send(_user);
    })
    .catch((err) => {
        console.log('Error', err);
        res.status(400).send(err)
    })
})

app.listen(port, () => {
    console.log('Server running on port', port);
})
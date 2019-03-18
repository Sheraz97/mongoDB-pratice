var { mongoose } = require('../server/db/mongoose');
var { Todo } = require('../server/models/todo');
var { user } = require('../server/models/users');
const {ObjectID} = require('mongodb');

Todo.remove({}).then((res) => { //Removes all entries
    console.log(res);
});

Todo.findByIdAndDelete(123456789).then((res) => { //Removes by using only id
    console.log(res);
});

Todo.findOneAndDelete({_id: '123456789'}).then((res) => { //Removes using this given id or any other criteria
    console.log(res);
});

// var MongoClient = require('mongodb').MongoClient;
var {MongoClient, ObjectID} = require('mongodb');
// Connection url
var url = 'mongodb://localhost:27017/TodoApp';
// Connect using MongoClient

var obj = new ObjectID();
console.log(obj);

MongoClient.connect(url, function (err, db) {
    if (err) {
        return console.log('Unable to connect to MOngoDB server.');
    }
    console.log('Connected to mongoDB server.');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('unable to insert todo');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    db.collection('Users').insertOne({
        name: 'Shiraz Ahmed',
        age: 20, 
        location: 'karachi',
        nick: 'SherrY'
    }, (err, result) => {
        if(err) {
            return console.log('unable to insert USER');
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
    })

    db.close();
});
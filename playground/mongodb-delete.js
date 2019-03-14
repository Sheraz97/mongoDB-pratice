var {MongoClient, ObjectID} = require('mongodb');
var url = 'mongodb://localhost:27017/TodoApp';
var obj = new ObjectID();
console.log(obj);

MongoClient.connect(url, function (err, db) {
    if (err) {
        return console.log('Unable to connect to MOngoDB server.');
    }
    console.log('Connected to mongoDB server.');

    db.collection('Users').deleteMany({nick: 'SherrY'}).then((result) => {
        console.log('removed User');
        console.log(JSON.stringify(result, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch Docs', err);
    })

    // db.close();
});
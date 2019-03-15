var mongoose = require('mongoose');

var user = mongoose.model('user', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    age: {
        type: Number
    }
});

module.exports = { user };
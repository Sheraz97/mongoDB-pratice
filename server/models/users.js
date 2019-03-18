const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    // console.log(_.pick(userObject, ['_id', 'email']))
    // console.log({
    //     _id: userObject._id,
    //     email: userObject.email
    // })
    return {_id: userObject._id, email: userObject.email}
};

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
    }, 'abc123').toString()

    // console.log('first user.token', user)
    // user.token.push({access, token});
    user.tokens = {...user.tokens, access, token}
    // console.log('user.token', user);

    return user.save()
    .then(() => {
        return token;
    })
}

var user = mongoose.model('user', UserSchema);

module.exports = { user };
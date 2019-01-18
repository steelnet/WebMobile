var mongoose = require('mongoose');
var User= new mongoose.Schema({
    user_id: {type: String, index: {unique: true}},
    username: {type: String},
    password: {type:String, default:'12345'}
    });
module.exports = mongoose.model('users', User);

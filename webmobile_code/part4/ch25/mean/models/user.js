//数据模型
var mongoose = require('mongoose');
var User= new mongoose.Schema({
    username: {type: String, index: {unique: true}},
    password: {type:String, default:'12345'}
    });
module.exports = mongoose.model('Users', User);//it is mongoose's model and nodejs's module

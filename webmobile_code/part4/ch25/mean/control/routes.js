var User = require('../models/user.js');
var express = require('express');
var router = express.Router();
//find all users
router.route('/users').get(function(req, res) {
  User.find(function(err, users) {
    if (err) {
      return res.send(err);
    }
    res.json(users);
  });
});
//register a new user
router.route('/').post(function(req, res) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      res.json({ message: 'register failed!' });
      return res.send(err);
    }
    res.json({ message: 'User Added' });
  });
});
//login a user
router.route('/:username').get(function(req, res) {
  User.find({username:req.params.username}, function(err, user) {
    if (err) {
      return res.send(err);
    }
    if (user.length!=0){res.json({message:'login success!'});} 
    else {res.json({message:'User not found!'})};
  });
});
//update a user
router.route('/').put(function(req,res){
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) {return res.send(err);}
    if (user!=null) { 
        for (prop in req.body) {
        user[prop] = req.body[prop];};
        user.save(function(err) {
            if (err) {return res.send(err);};
            res.json({ message: 'User updated!' });
        });
    } else { res.json({ message: 'User not found!'})}
})});
//delete a user
    router.route('/:username').delete(function(req, res){
        User.remove({username: req.params.username}, function(err, done) {
        if (err) {
            return res.send(err);}
    res.json({ message: 'user deleted:'+done.result.n });
  });
});
module.exports=router;
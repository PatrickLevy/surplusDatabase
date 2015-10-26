var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/surplus');

/* GET all users. */
router.get('/', function(req, res) {
	var collection = db.get('users');
	collection.find({}, function(err, user){
		if(err) throw err;
		res.json(user);
	});
});

//GET a user by id
router.get('/:id', function(req, res) {
    var collection = db.get('users');
    collection.findOne({ _id: req.params.id }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});


//POST a new user to database
router.post('/', function(req, res){
    var collection = db.get('users');
    collection.insert({
        name: {firstName: req.body.firstName, lastName: req.body.lastName},
        email: req.body.email
        
    }, function(err, user){
        if (err) throw err;

        res.json(user);
        
    });
});

//DELETE a user by id
router.delete('/:id', function(req, res) {
    var collection = db.get('users');
    collection.remove({ _id: req.params.id }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});

//PUT an update to a user's information
router.put('/:id', function(req, res){
    var collection = db.get('users');
    collection.update({
        _id: req.params.id
    },
    {
        name: {firstName: req.body.firstName, lastName: req.body.lastName},
        email: req.body.email
    }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});

module.exports = router;
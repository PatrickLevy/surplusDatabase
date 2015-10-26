var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/surplus');

/* GET all suppliers. */
router.get('/', function(req, res) {
	var collection = db.get('suppliers');
	collection.find({}, function(err, suppliers){
		if(err) throw err;
		res.json(suppliers);
	});
});

//POST a new supplier to database
router.post('/', function(req, res){
    var suppliersCollection = db.get('suppliers');
    suppliersCollection.insert({
        name: req.body.name,
        email: req.body.email,
        address: {street: req.body.street, city: req.body.city, state: req.body.state, zipcode: req.body.zipcode},
        phoneNumber: req.body.phoneNumber
        
    }, function(err, supplier){
        if (err) throw err;

        res.json(supplier);
        
    });
});

//GET a Supplier by id
router.get('/:id', function(req, res) {
    var suppliersCollection = db.get('suppliers');
    suppliersCollection.findOne({ _id: req.params.id }, function(err, supplier){
        if (err) throw err;

        res.json(supplier);
    });
});

//DELETE a Supplier by id
router.delete('/:id', function(req, res) {
    var suppliersCollection = db.get('suppliers');
    var componentsSuppliersCollection = db.get('componentsSuppliers');
    suppliersCollection.remove({ _id: req.params.id }, function(err, supplier){
        if (err) throw err;

        res.json(supplier);

        //remove any componentSupplier records that reference the removed supplier record
        componentsSuppliersCollection.remove({supplierId: req.params.id});
    });
});

module.exports = router;

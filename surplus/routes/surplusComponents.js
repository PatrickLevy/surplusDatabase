var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/surplus');

/* GET all components. */
router.get('/', function(req, res) {
	var collection = db.get('components');
	collection.find({}, function(err, components){
		if(err) throw err;
		res.json(components);
	});
});


//POST - Add a new component
router.post('/', function(req, res){
    var componentsCollection = db.get('components');
    var componentsSuppliersCollection = db.get('componentsSuppliers');
    componentsCollection.insert({
        name: req.body.name,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        partNumber: req.body.partNumber,
        category: req.body.category
    }, function(err, component){
        if (err) throw err;

        res.json(component);

        //Add componentSupplier record
        componentsSuppliersCollection.insert({
        	componentId: component._id.toString(),
        	supplierId: req.body.supplierId
        });

        
    });
});

//GET a Component by id
router.get('/:id', function(req, res) {
    var componentsCollection = db.get('components');
    componentsCollection.findOne({ _id: req.params.id }, function(err, component){
        if (err) throw err;

        res.json(component);
    });
});

//DELETE a Component by id
router.delete('/:id', function(req, res) {
    var componentsCollection = db.get('components');
    var componentsSuppliersCollection = db.get('componentsSuppliers');
    componentsCollection.remove({ _id: req.params.id }, function(err, component){
        if (err) throw err;

        console.log("Removed a component record");
        res.json(component);

        //remove any componentSupplier records that reference the removed component
        componentsSuppliersCollection.remove({componentId: req.params.id})
        

    });
});

//PUT an update to a components information
router.put('/:id', function(req, res){
    var collection = db.get('components');
    collection.update({
        _id: req.params.id
    },
    {
        name: req.body.name,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        partNumber: req.body.partNumber,
        category: req.body.category
    }, function(err, user){
        if (err) throw err;

        res.json(user);
    });
});

module.exports = router;

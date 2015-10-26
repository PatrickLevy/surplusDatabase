var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/surplus');

/* GET all componentsSuppliers. */
router.get('/', function(req, res) {
	var collection = db.get('componentsSuppliers');
	collection.find({}, function(err, componentsSuppliers){
		if(err) throw err;
		res.json(componentsSuppliers);
	});
});


//POST - Add a new componentsSuppliers
router.post('/', function(req, res){
    var componentsSuppliersCollection = db.get('componentsSuppliers');
    componentsSuppliersCollection.insert({
        componentId: req.body.componentId,
        supplierId: req.body.supplierId
    }, function(err, componentSupplier){
        if (err) throw err;

        res.json(componentSupplier);
        
    });
});

//GET a componentSupplier by id
router.get('/:id', function(req, res) {
    var componentsSuppliersCollection = db.get('componentsSuppliers');
    componentsSuppliersCollection.findOne({ _id: req.params.id }, function(err, componentSupplier){
        if (err) throw err;

        res.json(componentSupplier);
    });
});

//DELETE a componentSupplier by id
router.delete('/:id', function(req, res) {
    var componentsSuppliersCollection = db.get('componentsSuppliers');
    componentsSuppliersCollection.remove({ _id: req.params.id }, function(err, componentSupplier){
        if (err) throw err;

        res.json(componentSupplier);
    });
});


module.exports = router;

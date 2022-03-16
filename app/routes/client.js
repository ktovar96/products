var clientController = require('../controllers/clientController');
var router = require('express').Router();

router.post('/', function (req,res){
    clientController.create(req,res);
})

router.get('/', function (req, res){ //porque tenemos req y res si solo necesitamos res en clientController?
    clientController.list(req, res);
})

router.get('/:id', function(req, res){
    clientController.find(req,res);
})

module.exports = router;
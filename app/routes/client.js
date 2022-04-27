var clientController = require('../controllers/clientController');
var router = require('express').Router();
const userMiddleware = require('../middleware/users.js');

router.post('/', userMiddleware.isLoggedIn, function (req,res){
    clientController.create(req,res);
})

router.get('/', userMiddleware.isLoggedIn, function (req, res){ //porque tenemos req y res si solo necesitamos res en clientController?
    clientController.list(req, res);
})

router.get('/:id', userMiddleware.isLoggedIn, function(req, res){
    clientController.find(req,res);
})

module.exports = router;
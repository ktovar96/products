var invoiceController=require('../controllers/invoiceController');
var router = require('express').Router();
const userMiddleware = require('../middleware/users.js');

router.get('/', userMiddleware.isLoggedIn, function(req, res) {
  
    invoiceController.list(req,res);
})
router.get('/searchProduct/:product_id', userMiddleware.isLoggedIn, function(req, res) {
  
    invoiceController.searchProduct(req,res);
})

router.get('/:id', userMiddleware.isLoggedIn, function(req, res) {
  
    invoiceController.find(req,res);
})

router.get('/searchClient/:client_id', userMiddleware.isLoggedIn, function(req, res) {

    invoiceController.serachClient(req,res);
})

router.post('/', userMiddleware.isLoggedIn, function(req, res) {
  
    invoiceController.create(req,res);
})
//url:puerto/api/clientes
module.exports = router



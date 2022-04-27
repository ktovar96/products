var productController=require('../controllers/productController');
var router = require('express').Router();
const userMiddleware = require('../middleware/users.js');

router.get('/search/:id', function(req, res) {
  //res.json({ message: 'Vas a buscar un producto'})
  productController.search(req,res);
})
router.get('/', userMiddleware.isLoggedIn, function(req, res) {
  //res.json({ message: 'Estás conectado a la API. Recurso: clientes' })
  productController.list(req,res);
})
router.get('/:id', userMiddleware.isLoggedIn, function(req, res) {
  //res.json({ message: 'Vas a obtener la clientes con id ' + req.params.id })
  productController.find(req,res);
})
router.post('/', userMiddleware.isLoggedIn, function(req, res) {
  //res.json({ message: 'Vas a añadir un cliente' })
  productController.create(req,res);
})
router.put('/:id', userMiddleware.isLoggedIn,  function(req, res) {
  //res.json({ message: 'Vas a actualizar el cliente con id ' + req.params.id })
  productController.edit(req,res);
})
//url:puerto/api/clientes
module.exports = router



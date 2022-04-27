var router = require('express').Router()
 
var invoice = require('./invoice')
router.use('/invoice', invoice)

var product = require('./product')
router.use('/product', product)
var client= require('./client')
router.use('/client', client)
router.get('/', function (req, res) {
  res.status(200).json({ message: 'Estás conectado a nuestra API' })
})
//localhost:1339/api
module.exports = router

//localhost:1339/api/invoice/search/5
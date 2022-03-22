let mysql=require('../../db/mysql')
let invoice=require('../models/invoice')
module.exports = {

   create:(req,res)=>{

      console.log(req.body.client_id)
      let resultC = module.exports._validarCliente(req.body.client_id)

      if (resultC)
         mysql.query('select * from client where id = ?',req.body.client_id,(err, rows, fields) => {
            if (!err)
               res.json(rows)
            else
               res.json(err)
         })
      else 
         res.json('El cliente no existe')

   },
   list:(req,res)=>{
      mysql.query('select * from invoice',(err,rows,fields)=>{
         if (!err)
            res.json(rows)
         else
            res.json(err)
      })
   },
   find:(req,res)=>{
      mysql.query('select * from invoice as i inner join invoice_detail as ind on i.id = ind.invoice_id where i.id=?',req.params.id,(err,rows,fields)=>{
         if (!err)
            res.json(rows)
         else
            res.json(err)
      })
   },
   
   _validarCliente: (client_id) => {
      mysql.query('select * from client where id =?', client_id, (err,rows,fields) => {
         if (!err)
            if (rows.length == 1)
               return true
            else
               return false
         else
            return false
      })
   }
}

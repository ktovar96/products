let mysql=require('../../db/mysql')
let invoice_details=require('../models/invoice_details')
module.exports = {
   create:(req,res)=>{
      console.log(req.body)
      let resultI = module.exports._validarInvoice(req.body.invoice_id)
      let resultP = module.exports._validarProduct(req.body.product_id)

      if (resultI && resultP)
         mysql.query('insert into invoice_details SET ?',req.body,(err,rows,fields)=>{
            if(!err)
               res.json(rows)
            else
               res.json(err)
         })
      else 
         res.json('Parametros incorrectos')
   },
   
   list:(req,res)=>{
      mysql.query('select * from invoice_details',(err,rows,fields)=>{
         if (!err)
            res.json(rows)
         else
            res.json(err)
      })
   },
   find:(req,res)=>{
      mysql.query('select * from invoice_details where invoice_id=?',req.params.id,(err,rows,fields)=>{
         if (!err)
            res.json(rows)
         else
            res.json(err)
      })
   },
   edit:(req,res)=>{
      mysql.query('update invoice SET ? where id=?',[req.body, req.params.id],(err,rows,fields)=>{
         if (!err)
            res.json(rows)
         else
            res.json(err)
      })
   },
   search:(req,res)=>{ //para saber en que ventas se ha vendido el producto
      mysql.query('Select * \
         from invoice as i \
         inner join invoice_detail as ind on i.id = ind.invoice_id \
         inner join product as p on p.id = ind.product_id and ind.product_id=?',
         req.params.id,(err,rows,fields)=>{
         if (!err)
            res.json(rows)
         else
            res.json(err)
      })
   },

   _validarInvoice: (invoice_id) => {
      mysql.query('Select * from invoice where id =?', invoice_id, (err, rows, fields)=>{
         if (!err)
            if (rows.length == 1)
               return true
            else 
               return false
         else
            return false
      })
   },

   _validarProduct: (product_id) => {
      mysql.query('Select * from product where id =?', product_id, (err, rows, fields) => {
         if (!err)
            if (rows.length == 1)
               return true
            else
               return false
         else 
            return false
      } )
   }
}

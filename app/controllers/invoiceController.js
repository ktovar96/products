const { json } = require('body-parser');
let mysql=require('../../db/mysql')
let invoice=require('../models/invoice')
module.exports = {

   create:(req,res)=>{

      console.log(req.body)
      let product = req.body.products; 
      let client_id = req.body.client_id;
      let date = req.body.date;
      let payment = req.body.payment;
      let tax = req.body.tax;  
     // let cad = "insert into invoice_detail(product_id) values";
      //let resultC = module.exports._validarCliente(req.body.client_id);

      

      //if (resultC)
      console.log("AQUI")
      console.log(req.body);
         mysql.query("insert into invoice(date, payment, tax, client_id) values(?, ?, ?, ?)", [date, payment, tax, client_id],(err, rows, fields) => {
            if (!err){
               let cad = "insert into invoice_detail(invoice_id, product_id, quantity, cost) values";
               /*
                  insert into invoice_detail(invoice_id, product_id, quantity, cost) valules
                  (5,2,1,100),
                  (5,5,1,100);

               */
               let prods=req.body.productos;
               console.log(prods);
               console.log(rows);

               for (let i = 0; i < prods.length; i++) {
                  console.log(i);
                  if (i == prods.length - 1){
                     cad += "(" + rows.insertId + "," + prods[i].id + "," + prods[i].quantity + "," + prods[i].cost + ");";
                     console.log("oli")
                     console.log(cad);
                  } else{
                     cad += "(" + rows.insertId + "," + prods[i].id + "," + prods[i].quantity + "," + prods[i].cost + "),";
                     console.log(cad)
                  }
               }
              
               mysql.query(cad, (err, rows, fields) => {
                  if (!err){
                     res.json(rows);
                  } else {
                     res.json(err);
                  }
               });
            }else{
               res.json(err)
            }
         })
      //else 
        // res.json('El cliente no existe')

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

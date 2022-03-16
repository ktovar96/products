const mysql= require('../node_modules/mysql');

const mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'karla',
    password:'123',
    database: 'productos'
});
mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is connected');
    }
});
module.exports=mysqlConnection;
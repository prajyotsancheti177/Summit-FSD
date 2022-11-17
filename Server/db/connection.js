const mysql = require("mysql2");

const connection = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"1212",
    database:"Summit"
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("DB 1 connected");
});

module.exports = connection;
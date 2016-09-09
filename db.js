// Default Database connection
var mysql    = require('mysql');
var constant = require('./constants.js');

module.exports.connection=function (){

var connection = mysql.createConnection(constant.MYSQL_DB);
return connection;

}

// Central Calendar Database connection

module.exports.connection=function (){

var connection2 = mysql.createConnection(constant.CENTRAL_MYSQL_DB);
return connection2;

}

/////// Reporting Database connection
/*
 * The file will take care of the database connectivity
 * Created : 2016-08-31
 * Created By : Manoj Kumar Singh
 */
var mongoose = require('mongoose');
mongoose.connect(constant.MONGO_DB);

//check if we are connected successfully or not
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));



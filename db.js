// Default Database connection
var mysql    = require('mysql');
var constant = require('./constants.js');

module.exports.connection=function (){

//var connection = mysql.createConnection(constant.MYSQL_DB);
//return connection;
/*connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId)
})*/

}

module.exports.connection_central=function (){

var connection = mysql.createConnection(constant.CENTRAL_MYSQL_DB);
/*connection.connect(function(err) {
  if (err) {
    console.error('central error connecting: ' + err.stack);
    return;
  }
  console.log('central connected as id ' + connection.threadId)
  
})*/
return connection;

}


// Central Calendar Database connection
/*connection = mysql.createConnection(constant.CENTRAL_MYSQL_DB); 

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId)
});*/

/*
module.exports.connection=function (){
var connection = mysql.createConnection(constant.CENTRAL_MYSQL_DB);
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  else{
    console.error('connection success');
  }
});
}*/

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



// config/database.js
module.exports = {

    'url' : 'alisthubmarketing' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};

var mysql = require('mysql');

module.exports.connection=function (){

var connection = mysql.createConnection({
host : '52.39.212.226',
user : 'alisthubmarket',
password : 'alisthubmarket@2016',
database : 'alisthubmarketing',
port:3306
});
return connection;

}

/**
Express Controller to getSummaryReport
Created : 2016-09-20
Created By: Manoj Singh
Module : getSummaryReport
*/
var global_manager    = require('./../../../component/global_manager.js');

exports.getSummaryReport = function(req, res, next) {
    var obj_global_manager = new global_manager();
       obj_global_manager.global_dashboard_count(req,res,function(sdata){
         res.send({"code":200,"sdata":sdata,"message":"success!"});
    });
}

/**
Express Controller to getSummaryReport
Created : 2016-09-20
Created By: Manoj Singh
Module : getBreakdownReport
*/

exports.getBreakdownReport = function(req, res, next) {
    res.send({"code":200,"sdata":"","message":"success!"});
}
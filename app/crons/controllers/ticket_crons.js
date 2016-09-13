var showClix     = require('./../../showclix/showclix_sales.js');
var ticket_sales = require('./../../../models/ticket_sales.js');
var component    = require('./../../../component/common.js');

/**
Express Controller to Ticket Crons
Created : 2016-08-31
Created By: Manoj Kumar Singh
Module : Ticket Crons
*/

exports.saveTicketSales = function(req, res, next) {
        
    function save_data(req_data) {
        
        var input = [];
            for (var key in req_data){
                    //console.log(key);
                input.push(req_data[key]); 
            }
        
        /** To save new data ***/
            if (input.length > 0) {
                ticket_sales.collection.insert(input,function(err1,data)
                {
                    if (err1)
                    {
                        console.log(err1);
                        console.log("fail");
                    }
                    else
                    {
                        console.log(data);
                        console.log("success");   
                    }
                          
                });
            }
            else{
                console.log("No new data");
            }
    }
    
    function get_existing_sales(sale_data)
    {
        var result = '';
        ticket_sales.find({}, function (err, docs)
        {
            if (err) {
               console.log(err);
            }
            else
            {
                var result = '';
                if (docs.length > 0 && docs != "" && docs != null && docs !== undefined) {
                    result = '';
                    var keys = [];
                    
                    docs.forEach(function(value){
                        keys.push(value.sale_id); 
                    });
                    
                    if (keys.length > 0) {
                        var component1 = new component();
                        var inputJson = component1.exclude_array_diff(sale_data,keys);
                        save_data(inputJson.new_input);
                    }
                    
                } else {
                        save_data(sale_data);
                }
            }
            
        })
        
    }
    
    // Showclix start will work for live 
        /*var showClix2 = new showClix();
            showClix2.getTicketSales(1,function(sdata){
                if (sdata.status == 1) {
                console.log(sdata.data);    
                //var data          = CONSTANT.TEST_DATA;
                //var existing_data = get_existing_sales(data);    
                }else {
                    
                   
                }
            });*/
    // Showclix end
    
    var data          = CONSTANT.TEST_DATA;
    //var existing_data = get_existing_sales(data);
    
    
}

/**
Express Controller to Ticket Sales Crons
Created : 2016-08-31
Created By: Manoj Kumar Singh
Module : Ticket Crons
*/


/**
Express Controller to Ticket Cancelled Crons
Created : 2016-08-31
Created By: Manoj Kumar Singh
Module : Ticket Crons
*/

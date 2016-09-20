var showClix     = require('./../../showclix/showclix_sales.js');
var ticket_sales = require('./../../../models/ticket_sales.js');
var component    = require('./../../../component/common.js');

/**
Express Controller to Ticket Crons
Created : 2016-08-31
Created By: Manoj Kumar Singh
Module : Ticket Crons
*/
function formatDate(convertdate,type) {
  var today = convertdate;
  var month = today.getMonth() + +1;
  if (month < 10) { month = "0" + month; } else { month = month; }
  switch (type) {
    case 'DATE':
        return today.getFullYear() + "-" + month + "-" + today.getDate();
        break;
    case 'DATETIME':
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var seconds = today.getSeconds();
        var strTime = hours + ':' + minutes + ':' + seconds;
        var month = +today.getMonth() + +1;
        return today.getFullYear() + "-" + month + "-" + today.getDate() + " " + strTime;
        break;
      
    default: return today.getFullYear() + "-" + month + "-" + today.getDate();
  }
}

exports.saveTicketSales = function(req, res, next) {
        
    function save_data(req_data) {
        
        var input = [];
            for (var key in req_data){
                    //console.log(key);
                input.push(req_data[key]); 
            }
        
        /** To save new data ***/
            if (input.length > 0) {
                ticket_sales.insertMany(input,function(err1,data)
                {
                    if (err1)
                    {
                        console.log(err1);
                        console.log("fail");
                    }
                    else
                    {
                        console.log(data.insertedIds);
                        console.log("success");
                        ticket_sales.update({_id:{$in:data.insertedIds}},{$set:{created:formatDate(new Date(),'DATE')}},{multi:true},function(err5,res2)                  {
                        if (err5)
                        {
                          console.log(err5);
                          console.log("fail2");
                        }
                        else{
                          console.log("success2");
                        }
                      });
                        
                        
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
    var existing_data = get_existing_sales(data);
    
    
}


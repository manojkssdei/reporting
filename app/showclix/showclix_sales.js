var request    = require('request');

module.exports = function()
{
    
  this.getTicketSales = function(req,res,next)
  {
    var reportDataUrl = CONSTANT.SHOWCLIX.SALE_TICKET_API;

    if(req.end_date && req.start_date){
      reportDataUrl += "&end_date=" + req.end_date + " &start_date="+ req.start_date;     
    }
    /************************************* GENERATE TOKEN *******************************************/
        var showclix_token = "";
        request.post({
        "rejectUnauthorized": false,
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                   "Accept": "application/json"},
        url:     CONSTANT.SHOWCLIX.REGISTRATION,
        form:  {"email":CONSTANT.SHOWCLIX.PARTER_EMAIL,"password":CONSTANT.SHOWCLIX.PARTER_PASSWORD},
        json: true}, function(error, response, body){
        if(error){
          console.log(error);
        }
        else {
        
        showclix_token = response.body.token;
       
        /************************************* GET SALE DATA *******************************************/
        if (showclix_token != "") {
          request.get({
                    headers: {'X-API-Token': showclix_token }, 
                    url: reportDataUrl,
                    form: {} }, function(error, response, body) {
                      if(response.statusCode == 200 || response.statusCode == 201){
                      return next({status:1,data:response.body});
                      } else {
                      console.log(error);  
                      return next({status:0,data:""});
                      }
          });
        }
               
        /************************************* GET SALE DATA *******************************************/
        }
    });
    /************************************* GENERATE TOKEN *******************************************/
     
    
  }

  this.getEventSaleData = function(req,res,next) {
    var reportDataUrl = "https://api.showclix.com/Sale/search?event = "+req.showclixEventId+"&seller="+req.showclix_seller_id;
    request.get({
      headers: {'Content-Type':'application/json','X-API-Token': req.showclix_token }, //{'X-API-Token':req.showclix_token},
      url: reportDataUrl,
      form: {} }, function(error, response, body) {
      if(response.statusCode == 200) {
        return next({status:1,data:response.body});
      } else {
        return next({status:0,data:""});
      }
    });
  }
 
 

}

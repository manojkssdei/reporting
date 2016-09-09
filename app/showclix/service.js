

var showClix   = require('./../../constant.js');
var request    = require('request');
var http       = require('http');
module.exports = function()
{
  this.map_venue = function(data,res,next)
  {
    request.post({
                headers: {'X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/VenueSellers",
                form:    { "venue_id":data.venue_id,
                           "seller_id":data.showclix_seller_id
            } }, function(error, response, body){
            console.log(response.statusCode);
    });
    
  }
  
  this.add_venue = function(req,res,next)
  {
    // required : venue_name , address ,city , status
    console.log(req.body);
    var img_url = "http://52.39.212.226:4004/images/venues/";
    var input = { "venue_name": req.body.venue_name,
              "seating_chart_name": "",
              "description": req.body.venue_name,
              "booking_info": null,
              "seating_chart_type": "2",
              "contact_title": null,
              "address": req.body.address,
              "city": req.body.city,
              "state": req.body.state,
              "zip": req.body.zipcode,
              "country": req.body.country,
              "timezone": null,
              "status": "2",
              "lat": req.body.latitude,
              "lng": req.body.longitude
            };
    if (req.body.contact_name && req.body.contact_name !== undefined && req.body.contact_name != "") {
      input.contact_name = req.body.contact_name;
    }
    if (req.body.timezone && req.body.timezone !== undefined && req.body.timezone != "") {
      input.timezone_name = req.body.timezone;
    }
    if (req.body.fax && req.body.fax !== undefined && req.body.fax != "") {
      input.fax = req.body.fax;
    }
     if (req.body.url && req.body.url !== undefined && req.body.url != "") {
      input.url = req.body.url;
    }
    if (req.body.email && req.body.email !== undefined && req.body.email != "") {
      input.email = req.body.email;
    }
    if (req.body.phone && req.body.phone !== undefined && req.body.phone != "") {
      input.phone = req.body.phone;
    }
    if (req.body.image && req.body.image !== undefined && req.body.image != "") {
      input.image = img_url+req.body.image;
    }
    if (req.body.seating_chart && req.body.seating_chart !== undefined && req.body.seating_chart != "") {
      input.seating_chart = img_url+req.body.seating_chart;
    }
    if (req.body.capacity && req.body.capacity !== undefined && req.body.capacity != "") {
      input.capacity = req.body.capacity;
    }
    
    if (req.body.showclix_venue_id && req.body.showclix_venue_id !== undefined && req.body.showclix_venue_id != "")    {
      input.venue_id = req.body.showclix_venue_id.toString();
       //////////////////////////////////////////////////////////////////////////////////////
        request({
                method:'PUT',
                headers: {'Content-Type':'application/json','Pragma':'no-cache','X-API-Token':req.body.showclix_token},
                url:     "http://api.showclix.com/Venue/"+req.body.showclix_venue_id,
                body:    input,
                json: true}, function(error, response, body){
                 
                  if (response.statusCode == 200 || response.statusCode == 201) {
                    console.log("---------6-------");
                    return next({status:1,location:req.body.showclix_venue_id});
                  }
                  else
                  {
                    console.log("---------5-------");
                    return next({status:0,location:"","error":str});
                  }
                   
          });
          //////////////////////////////////////////////////////////////////////////////// 
      
    }
    else
    {
              request.post({
                headers: {'X-API-Token':req.body.showclix_token},
                url:     showClix.addVenue,
                form:    input }, function(error, response, body){
                    if (response.headers.location) {
                    var venue_loc  = response.headers.location;
                    var venue_loc2 = venue_loc.split("/");
                    var venue_id   = venue_loc2[4];
                    ///////////////////////////////////////////////////
                    request.post({
                    headers: {'X-API-Token':req.body.showclix_token},
                    url:     "http://api.showclix.com/VenueSellers",
                    form:    { "venue_id":venue_id,
                               "seller_id":req.body.showclix_seller_id
                            } }, function(error2, response2, body2){
                            console.log(response2.statusCode);
                            console.log(body2);
                            if (response2.statusCode == 200 || response2.statusCode == 201) {
                             return next({status:1,location:venue_loc});
                            }
                            else{
                             return next({status:0,location:""}); 
                            }
                            
                            
                    });
                    //////////////////////////////////////////////////
                    
                   }
                   else
                   {
                   return next({status:0,location:""});
                                      
                   }
                   
              });
    }
    
  } 
    
  this.add_event = function(data,res,next)
  {
  // required : event_name , address ,city , status (1, 2, 3, 4, 5, 7, 8),
  //0.event_type :   int. 3 for General Admission Event, 2 for an Assigned Seating Event 
  //1.status : { Description: int. Events can be setup in stages. A status of 5 means the even is completely setup. A status of 4 means the event is in Preview Mode - only the seller can view the listing on ShowClix. 3, 2, and 1 each mean that the event is not complete and can be used to represent different stages in an event process if desired. 6 = canceled, 7 = paused, 8 = suspended.
//Required: Yes
//Rule In: 1, 2, 3, 4, 5, 7, 8 }
//2.sales_open : datetime. SQL Timestamp of when sales open, stored in venue timezone
//3.event_start : datetime. SQL Timestamp of when event starts, stored in venue timezone
//4.short_name : An alias name (slug) that can be used in the event listing URL e.g. http://www.showclix.com/event/NICKNAME. Useful for SEO.
//5.description : string. description of the event. santized to allow limited html supported. no javascript.
//6.event : string. the title of the event.
//7.event_id :  int. Primary Key. Id of an event. (not required) 
    var input = {
                 "event":data.eventname,
                 "description":JSON.stringify(data.content),
                 "short_name":data.eventurl,
                 "event_start":data.event_startdatetime,
                 "sales_open":data.event_startdatetime,
                 "user_id":data.showclix_user_id,
                 "seller_id":data.showclix_seller_id,
                 "event_type":"3",
                 "status":"5"
                };
      
      if (data.showclix_venue_id && data.showclix_venue_id != "" && data.showclix_venue_id !== undefined) {
       input.venue_id = data.showclix_venue_id;
      }
                
      if(data.showclix_id != "" && data.showclix_id !== undefined){
        console.log("---------3-------");
        input.event_id = data.showclix_id.toString();
        input.status   = '5';
        delete input.description;
        delete input.short_name;
        delete input.sales_open;
        delete input.user_id;
        
        //////////////////////////////////////////////////////////////////////////////////////
        request({
                method:'PUT',
                headers: {'Content-Type':'application/json','Pragma':'no-cache','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event/"+data.showclix_id,
                body:    input,
                json: true}, function(error, response, body){
                  var str = "There is some problem on server. Please try after some time.";
                  function isJson(item) {
                      item = typeof item !== "string"
                          ? JSON.stringify(item)
                          : item;
                  
                      try {
                          item = JSON.parse(item);
                      } catch (e) {
                          return false;
                      }
                  
                      if (typeof item === "object" && item !== null) {
                          return true;
                      }
                  
                      return false;
                  }
                  var dataw = response.body;
                  
                  if (isJson(response.body)) {
                    str = response.body;
                  }
                  
                  if (str.event_id && str.event_id !== undefined) {
                    console.log("---------6-------");
                    return next({status:1,location:str.event_id});
                  }
                  else
                  {
                    console.log("---------5-------");
                    return next({status:0,location:"","error":str});
                  }
                   
          });
          //////////////////////////////////////////////////////////////////////////////// 
        
        
      }
      else{
    request.post({
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:    input }, function(error, response, body){
                  var str = response.body;
                  console.log(response.body);
                                  
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                    var percent  = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 =percent3.replace("</h3>", "");
                    return next({status:0,location:"","error":percent3});
                  }
                   
               });
      }
    
  }
  
  this.single_2nd_step = function(data,res,next)
  {
       var input = {};
      if(data.showclix_id != "" && data.showclix_id !== undefined){
        console.log("---------3-------");
        input.event_id = data.showclix_id.toString();
        input.status   = '5';
        input.inventory = data.eventinventory;
        input.event_category_id = data.category1;
        input.ages     = data.custom_ages;
        input.url      = data.eventwebsite;
        input.keywords = data.keyword;
        
        if (data.type_of_event == 1) {
        input.event_type = 3;
        }
        if (data.type_of_event == 0) {
        input.event_type = 2;
        }
        
        input.event_type = 3;
        
        //////////////////////////////////////////////////////////////////////////////////////
        request({
                method:'PUT',
                headers: {'Content-Type':'application/json','Pragma':'no-cache','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event/"+data.showclix_id,
                body:    input,
                json: true}, function(error, response, body){
                  var str = "There is some problem on server. Please try after some time.";
                  function isJson(item) {
                      item = typeof item !== "string"
                          ? JSON.stringify(item)
                          : item;
                  
                      try {
                          item = JSON.parse(item);
                      } catch (e) {
                          return false;
                      }
                  
                      if (typeof item === "object" && item !== null) {
                          return true;
                      }
                  
                      return false;
                  }
                  var dataw = response.body;
                  
                  if (isJson(response.body)) {
                    str = response.body;
                  }
                  
                  if (str.event_id && str.event_id !== undefined) {
                    console.log("---------6-------");
                    return next({status:1,location:str.event_id});
                  }
                  else
                  {
                    console.log("---------5-------");
                    return next({status:0,location:"","error":str});
                  }
                   
          });
          //////////////////////////////////////////////////////////////////////////////// 
        
        
      }
      else{
          return next({status:0,location:"","error":"Server error"}); 
      }
  }
  
  this.single_4th_step = function(data,res,next)
  {
       var input = {};
      if(data.showclix_id != "" && data.showclix_id !== undefined){
        console.log("---------3-------");
        input.event_id = data.showclix_id.toString();
        input.status   = '5';
        //input.event_type  = '2';
        input.donation_live = data.donation == 1 ?'y':'n';
        if (data.donation == 1) {
          input.donation_name = data.donation_name;
        }
        
        input.approved      = 1;
        input.bos_price     = data.box_office_service_fee;
        input.ticket_note   = data.ticket_note;
        //input.sales_open   = data.ticket_note;
        input.ticket_note   = data.ticket_note;
        
        if (data.online_sales_open_date) {
        input.sales_open   = data.online_sales_open_date;
        }
        if (data.online_sales_close_date) {
        input.sales_close   = data.online_sales_close_date;
        }
        
        //////////////////////////////////////////////////////////////////////////////////////
        request({
                method:'PUT',
                headers: {'Content-Type':'application/json','Pragma':'no-cache','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event/"+data.showclix_id,
                body:    input,
                json: true}, function(error, response, body){
                  console.log("=================");
                  console.log(body);
                  console.log("=================");
                  var str = "There is some problem on server. Please try after some time.";
                  function isJson(item) {
                      item = typeof item !== "string"
                          ? JSON.stringify(item)
                          : item;
                  
                      try {
                          item = JSON.parse(item);
                      } catch (e) {
                          return false;
                      }
                  
                      if (typeof item === "object" && item !== null) {
                          return true;
                      }
                  
                      return false;
                  }
                  var dataw = response.body;
                  
                  if (isJson(response.body)) {
                    str = response.body;
                  }
                  
                  if (str.event_id && str.event_id !== undefined) {
                    console.log("---------6-------");
                    return next({status:1,location:str.event_id});
                  }
                  else
                  {
                    console.log("---------5-------");
                    return next({status:0,location:"","error":str});
                  }
                   
          });
          //////////////////////////////////////////////////////////////////////////////// 
        
        
      }
      else{
          return next({status:0,location:"","error":"Server error"}); 
      }
  }
  
  
  this.add_price_level = function(data,res,next)
  {
      var input = {
                 "event_id":data.showclix_id,
                 "level":data.price_level,
                 "active":1
                  };
      
      if(data.showclix_price_id) {  input.level_id = data.showclix_price_id;  }
      if(data.online_price)    {    input.price = data.online_price; }
      if(data.minimum_price)   {    input.min_price = data.minimum_price; }
      if(data.box_office_price){    input.bos_price = data.box_office_price; }
      if(data.quantity_available){  input.limit = data.quantity_available; }
      if(data.description)     {    input.description = data.description; }
      if(data.minimum_per_order){   input.increment_by = data.minimum_per_order; }
      if(data.maximum_per_order){   input.transaction_limit = data.maximum_per_order; }
      if(data.suggested_price){     input.upsell_price = data.suggested_price; }
      if(data.hide_in_box_office){  input.box_office_hide = data.hide_in_box_office; }
      
      if(data.showclix_price_id != "" && data.showclix_price_id !== undefined){
          input.level_id = data.showclix_price_id;     
        //////////////////////////////////////////////////////////////////////////////////////
        request({
                method:'PUT',
                headers: {'Content-Type':'application/json','Pragma':'no-cache','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/PriceLevel/"+data.showclix_price_id,
                body:    input,
                json: true}, function(error, response, body){
                  //console.log(response.body);
                  console.log(response.statusCode);
                   
                  var str='';                 
                  if (response.statusCode == 200) {
                    console.log("---------6-------");
                    return next({status:2,location:data.showclix_price_id});
                  }
                  else
                  {
                    console.log("---------5-------");
                    return next({status:0,location:"","error":str});
                  }
                   
          });
          //////////////////////////////////////////////////////////////////////////////// 
        
        
      }
      else{
      request.post({
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/PriceLevel",
                form:    input }, function(error, response, body){
                   console.log(response.code);
                  var str = response.body;
                  console.log(response.body);
                                  
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                    var percent  = str.split("<p>");
                    var percent2 = percent[1].split("</p>");
                    var percent3 = percent2[0].replace("<h2>", "");
                    var percent3 = percent3.replace("<h3>", "");
                    var percent3 = percent3.replace("</h2>", "");
                    var percent3 =percent3.replace("</h3>", "");
                    return next({status:0,location:"","error":percent3});
                  }
                   
               });
    }
  }
  
  this.add_series_event = function(data,res,next)
  {
    // required : event_name , address ,city , status (1, 2, 3, 4, 5, 7, 8),
  //0.event_type :   int. 3 for General Admission Event, 2 for an Assigned Seating Event 
  //1.status : { Description: int. Events can be setup in stages. A status of 5 means the even is completely setup. A status of 4 means the event is in Preview Mode - only the seller can view the listing on ShowClix. 3, 2, and 1 each mean that the event is not complete and can be used to represent different stages in an event process if desired. 6 = canceled, 7 = paused, 8 = suspended.
//Required: Yes
//Rule In: 1, 2, 3, 4, 5, 7, 8 }
//2.sales_open : datetime. SQL Timestamp of when sales open, stored in venue timezone
//3.event_start : datetime. SQL Timestamp of when event starts, stored in venue timezone
//4.short_name : An alias name (slug) that can be used in the event listing URL e.g. http://www.showclix.com/event/NICKNAME. Useful for SEO.
//5.description : string. description of the event. santized to allow limited html supported. no javascript.
//6.event : string. the title of the event.
//7.event_id :  int. Primary Key. Id of an event. (not required) 
    
    var input = {
                 "event":data.eventname,
                 "description":JSON.stringify(data.content),
                 "short_name":data.eventurl,
                 "event_start":data.event_startdatetime,
                 "sales_open":data.event_startdatetime,
                 "user_id":data.showclix_user_id,
                 "seller_id":data.showclix_seller_id,
                 "venue_id":"34657",
                 "event_type":"3",
                 "status":"1",
                 "behavior_set":"3",
                 "position":"3"
                };
    //{"user_id":"28676","seller_id":"22876","venue_id":"34657","event":req.eventname,"description":req.content,"inventory":"600","private_event":"0","price":"18.00","price_label":"General Admission","price_limit":"1","ticket_purchase_timelimit":null,"ticket_purchase_limit":null,"will_call_ticketing":null,"ages":"0","image":"20091252630916.jpg","url":null,"event_type":"3","ticket_note":null,"status":"1","keywords":null,"sales_open":req.eventdate,"event_start":req.eventdate,"short_name":req.short_name,"display_image":"1","behavior_set":"3","position":"3"}
        console.log("================");
        console.log(data);
        console.log("=================="); 
        if(data.showclix_id != "" && data.showclix_id !== undefined){
        console.log("---------3-------");
        input.event_id = data.showclix_id.toString();
        input.status   = '5';
        delete input.description;
        //delete input.short_name;
        delete input.sales_open;
        delete input.user_id;
        
        //////////////////////////////////////////////////////////////////////////////////////
        request({
                method:'PUT',
                headers: {'Content-Type':'application/json','Pragma':'no-cache','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event/"+data.showclix_id,
                body:    input,
                json: true}, function(error, response, body){
                  var str = "There is some problem on server. Please try after some time.";
                  function isJson(item) {
                      item = typeof item !== "string"
                          ? JSON.stringify(item)
                          : item;
                  
                      try {
                          item = JSON.parse(item);
                      } catch (e) {
                          return false;
                      }
                  
                      if (typeof item === "object" && item !== null) {
                          return true;
                      }
                  
                      return false;
                  }
                  var dataw = response.body;
                  
                  if (isJson(response.body)) {
                    str = response.body;
                  }
                  
                  console.log(response.statusCode);
                  
                  if (str.event_id && str.event_id !== undefined) {
                    console.log("---------6-------");
                    return next({status:1,location:str.event_id});
                  }
                  else
                  {
                    console.log("---------5-------");
                    return next({status:0,location:"","error":str});
                  }
                   
          });
          //////////////////////////////////////////////////////////////////////////////// 
        
        
      }
      else{
    
    request.post({
                headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','X-API-Token':data.showclix_token},
                url:     "http://api.showclix.com/Event",
                form:   input }, function(error, response, body){
                  
                  console.log(response.body);
                  
                  console.log(response.headers.location);
                  if (response.headers.location) {
                    return next({status:1,location:response.headers.location});
                  }
                  else
                  {
                   return next({status:0,location:""});
                                     
                  }
                   
               });
   }
    
  }
  
  
  this.delete_event = function(req,res,next)
  {
    // required : 
    console.log(req);
    request.delete({
                headers: {'X-API-Token':req.showclix_token},
                url:     "https://api.showclix.com/Event/"+req.showclix_id,
                form:    {} }, function(error, response, body){
                    return next({status:1,location:""});
                });
    
  }

  
  this.get_price_level = function(req,res,next)
  {
    request.get({
                headers: {"content-type": "application/json"}, //{'X-API-Token':req.showclix_token},
                url:     "https://api.showclix.com/Event/"+req+"/price_levels",
                form:    {} }, function(error, response, body){
                    return next({status:1,data:response.body});
    });
  }

     
  this.change_price_level = function(data,res,next)
  {
    var input = {};
    input.PriceLevelSchedule__disabled=0;
    input.PriceLevelSchedule__start_date       = data.start_date;
    input.PriceLevelSchedule__start_date_date  = data.start_date_date;
    input.PriceLevelSchedule__start_date_hour  = data.month;
    input.PriceLevelSchedule__start_date_minute= data.time;
    input.PriceLevelSchedule__start_date_am_pm = data.interval;
    input.PriceLevelSchedule__price            = data.new_price;
    input.PriceLevelSchedule__apply_to         = data.apply;
    
    request.post({
                headers: {"content-type": "application/json", 'X-API-Token':data.showclix_token},
                url: "https://admin.alistixs.com/event/"+data.showclix_id+"/level/"+data.showclix_price_id+"/schedule.json",
                form:   input }, function(error, response, body){
                  if (response.statusCode == 200) {
                    return next({status:1,data:response.body});
                  }
                  else{
                    return next({status:0,data:"Server Error"});
                  }
                  
    });  
  }
   
  this.change_price_level_status = function(data,res,next)
  {
      var input = {};
      input.status                                = data.status;
      input.PriceLevelSchedule__start_date        = data.start_date;
      input.PriceLevelSchedule__start_date_hour   = data.start_date_hour;
      input.PriceLevelSchedule__start_date_minute = data.start_date_minute;
      input.PriceLevelSchedule__start_date_am_pm  = data.start_date_am_pm;
 
      request({
                method:'POST',
                headers: {'Content-Type':'application/json','Pragma':'no-cache','X-API-Token':data.showclix_token},
                url:     "https://admin.alistixs.com/event/"+data.showclix_id+"/level/"+data.showclix_price_id+"/status-schedule.json",
                body:    input,
                json: true}, function(error, response, body){
                  //console.log(response.body);
                  console.log(response.statusCode);
                  var str='';                 
                  return next({status:1,location:data.showclix_price_id});
                    
          }); 
  }
  
  this.delete_price_level = function(req,res,next)
  {
    request.delete({
                headers: {"content-type": "application/json",'X-API-Token':req.showclix_token}, 
                url:     "http://api.showclix.com/PriceLevel/"+req.showclix_price_id,
                form:    {} }, function(error, response, body){
                  if (response.statusCode == 200) {
                    return next({status:1,data:response.body});
                  }
                  else{
                    return next({status:0,data:response.body});
                  }
                  
    });  
  }
  
  this.delete_level_schedule = function(req,res,next)
  {
    
    request.delete({
                headers: {'X-API-Token':req.showclix_token}, 
                url:     "https://admin.alistixs.com/rest.api/PriceLevelSchedule/"+req.showclix_price_schedule_id,
                form:    {} }, function(error, response, body){
                   console.log(response.statusCode);
                   //console.log(body);
                  if (response.statusCode == 200) {
                    return next({status:1,data:response.body});
                  }
                  else{
                    return next({status:0,data:response.body});
                  }
                  
    });  
  }

}

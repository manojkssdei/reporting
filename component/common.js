module.exports = function()
{
  /***
    To get array diff functionality
    Created : 2016-08-31
    Created By : Manoj Kumar Singh
  ***/
  this.exclude_array_diff = function(array1,array2)
  {
    var result  = [];
    var cresult = [];
    
    array2.forEach(function(value,key){
      if (array1[value] && array1[value] !== undefined && array1[value] != "") {
        cresult.push(value);
        delete array1[value];
      }
      else{
        result.push(value);
      }
    });
    return {"new_keys":result,"old_keys":cresult,'new_input':array1};
  }
  
  /***
    To get current date foramt (YYYY-MM-DD)
    Created : 2016-08-31
    Created By : Manoj Kumar Singh
  ***/
  this.currentDate = function(req,res)
  {
     var curdate = new Date();
      var month   = curdate.getMonth()+1; 
      var day     = curdate.getDate();
      if (day < 9) {
      var  day = '0'+day;
      }
      var year    = curdate.getFullYear();
      //var curtime = + curdate.getHours() + ":" + curdate.getMinutes() + ":" + curdate.getSeconds();
      return year+'-'+month+'-'+day;
  }
  
  /***
    To get current date foramt (YYYY-MM-DD HH:MM)
    Created : 2016-08-31
    Created By : Manoj Kumar Singh
  ***/
  this.currentDateTime = function(req,res)
  {
     var curdate = new Date();
      var month   = curdate.getMonth()+1; 
      var day     = curdate.getDate();
      if (day < 9) {
      var  day = '0'+day;
      }
      var year    = curdate.getFullYear();
      var curtime = + curdate.getHours() + ":" + curdate.getMinutes() + ":" + curdate.getSeconds();
      return year+'-'+month+'-'+day +" "+ curtime;
  }
  
  /***
    To get current date foramt (YYYY-MM-DD HH:MM) according to Timezone
    Created : 2016-08-31
    Created By : Manoj Kumar Singh
  ***/
  this.currentDateTimeZone = function(date,req,res)
  {
     var curdate = new Date(date);
      var month   = curdate.getMonth()+1; 
      var day     = curdate.getDate();
      if (day < 9) {
      var  day = '0'+day;
      }
      var year    = curdate.getFullYear();
      var curtime = + curdate.getHours() + ":" + curdate.getMinutes() + ":" + curdate.getSeconds();
      return year+'-'+month+'-'+day +" "+ curtime;
  }
  
}

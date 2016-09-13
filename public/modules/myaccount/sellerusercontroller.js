angular.module('alisthub').controller('accountinfosellerController', function($scope,$localStorage,$injector,$http,$state,$location,$timeout,$window,$rootScope) {

    if (!$localStorage.isuserloggedIn) {
      $state.go('login');
    } 
    var $serviceTest = $injector.get("profilesub");
    $scope.basictab   = false;
    $scope.producttab = false;
    $scope.discounttab = false;
    $scope.questiontab = false;
    $scope.socialtab = false;
    
    $scope.basictabclass     = "fa-caret-down";
    $scope.producttabclass   = "fa-caret-down";
    $scope.discounttabclass  = "fa-caret-down";
    $scope.questiontabclass  = "fa-caret-down";
    $scope.socialtabclass    = "fa-caret-down";

    $scope.success_message=false;
    $scope.faluire_message=false;
    $scope.success="";
    $scope.data = {};
    $scope.social = {};
    $scope.userdetail = {};
    $scope.email = {};
    $scope.advSetting = {};

   $scope.openTab = function(id)
    {
        if (id == 1) {

            //console.log('$scope.basictab' , $scope.basictab);
             if( $scope.basictab == true) {
            $scope.basictab     = false;
            $scope.basictabclass     = "fa-caret-down";
             }
             else {
            $scope.basictab     = true;
            $scope.basictabclass     = "fa-caret-up";
             }

            $scope.producttab = false;
            $scope.discounttab = false;
            $scope.questiontab = false;
            $scope.socialtab  = false;

            $scope.producttabclass   = "fa-caret-down";
            $scope.discounttabclass  = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }

        if (id == 2) {

            if( $scope.discounttab == true) {
            $scope.discounttab     = false;
            $scope.discounttabclass     = "fa-caret-down";
             }
             else {
            $scope.discounttab     = true;
            $scope.discounttabclass     = "fa-caret-up";
             }

            $scope.basictab   = false;
            $scope.producttab = false;
            $scope.questiontab = false;
            $scope.socialtab  = false;
            // class
            $scope.basictabclass     = "fa-caret-down";
            $scope.producttabclass   = "fa-caret-down";
            $scope.questiontabclass  = "fa-caret-down";
            $scope.socialtabclass    = "fa-caret-down";
        }

        
    }
      

              var subseller = {}
              subseller.id = $localStorage.sellerSubUserId
             $serviceTest.getsubSellerUser(subseller, function(response) {
                    if (response.code == 200) {
                      console.log("done "+response)
                      $scope.userdetail.first_name = response.result[0].first_name;
                      $scope.userdetail.last_name = response.result[0].last_name;
                      $scope.userdetail.timezone = response.result[0].timezone;
                      $scope.userdetail.phone_no = response.result[0].phone;
                      $scope.userdetail.fax = response.result[0].fax;
                       // $location.path("/view_user");
                    } else {
                        $scope.activation_message = global_message.ErrorInActivation;
                    }

                });


        /*Update user details*/
    $scope.updatesubSellerUser = function(userdetails) {
              if ($localStorage.userId!=undefined) {
            $scope.userdetail.user_id   = $localStorage.userId;
            $scope.userdetail.subseller_user_id   = $localStorage.sellerSubUserId;

            $serviceTest.updatesubSellerUser($scope.userdetail, function(response) {
                    if (response.code == 200) {
                      console.log("done "+response)
                      $scope.success = "Account has been updated successfuly";
                      $scope.success_message = true;
          
                      $timeout(function() {
                        $scope.error = '';
                        $scope.success_message = false;
                        $scope.success = '';
                        //$location.path("/view_all_event");
                      }, 5000);
                       // $location.path("/view_user");
                       $rootScope.name = $localStorage.name = $scope.userdetail.first_name + " " +$scope.userdetail.last_name;
                    } else {
                      $scope.error = "There is some problem in updating data , please try after some time";
                      $scope.error_message = true;
          
                      $timeout(function() {
                        $scope.error = '';
                        $scope.error_message = false;
                        
                        //$location.path("/view_all_event");
                      }, 5000);
                    }

                });
            
      }
       
    }

            //     var url = webservices.updatesubSellerUser+"?data="+JSON.stringify($scope.userdetail)+"&callback=jsonp_callback9";
        //             // console.log("lol "+url)
        //     $http.jsonp(url);
                      
        //     $window.jsonp_callback9 = function(data) {
        //                  console.log("data "+JSON.stringify(data));
        //                   if (data.code == 200) {
        //                       $location.path("/view_account");
        //                       $scope.success_message = true;
        //                       $scope.success  = global_message.userInfoUpated;
        //                       $rootScope.name = $localStorage.name = $scope.userdetail.first_name + " " +$scope.userdetail.last_name;
        //                       $timeout(function() {
        //                           $scope.error='';
        //                           $scope.success_message=false;
        //                           $scope.success='';
        //                       },3000);
        //                   }
        //                   else
        //                   {
        //                   $scope.error_message = true;
        //                   $scope.error=global_message.errorChangeEmail;
        //                   }
                                                
                         
        //     }

    /*Update email of user*/
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
var encode = function(value){
  var encodedString = Base64.encode(value);
  return encodedString;
}
// var decode = function(value){
//   var decodedString = Base64.decode(value);
//   return decodedString;
// }
     /*Update password of user*/
    $scope.updatesubsellerPassword = function() {
          if ($localStorage.userId!=undefined) {
            $scope.data.user_id   = $localStorage.userId;
            $scope.data.subseller_user_id   = $localStorage.sellerSubUserId;
            var oldpassword = encode($scope.data.oldpass);
            var newpassword = encode($scope.data.newpass);
            $scope.data.oldpass = oldpassword;
            $scope.data.newpass = newpassword;
            $serviceTest.updatesubsellerPassword($scope.data, function(response) {
                    if (response.code == 200) {
                       // $location.path("/view_user");
                      $scope.success = "Password has been updated successfuly";
                      $scope.success_message = true;
                      $scope.data = {};
                      $scope.discounttab = false;
                      $timeout(function() {
                        $scope.error = '';
                        $scope.success_message = false;
                        $scope.success = '';
                        //$location.path("/view_all_event");
                      }, 5000);
                       
                        
                    } else {
                      $scope.error = "There is some problem in updating data , please try after some time";
                      $scope.error_message = true;
          
                      $timeout(function() {
                        $scope.error = '';
                        $scope.error_message = false;
                        
                        //$location.path("/view_all_event");
                      }, 5000);
                        
                    }

                });
            
      }
    };

    


});



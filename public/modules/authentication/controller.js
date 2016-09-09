/**
  Angular Controller to Manage Authentication
  Created : 2016-05-03
  Created By: Lavlesh Mishra
  Module : Authentication
*/
angular.module('alisthub').controller('loginController', function($http,$location,$scope, $ocLazyLoad,$rootScope,$state, $timeout,$localStorage,$anchorScroll) {
        if ($localStorage.isuserloggedIn) {
                $rootScope.class_status = 0;
                $state.go('dashboard');
        }
        $anchorScroll();
        $rootScope.class_status=1;
        $scope.regsuccess_message_span = false;
        $scope.activation_message = false;
        $scope.user = {};
        if ($state.params.id) {
              //  confirmationEmail
                var serviceUrl = webservices.confirmationEmail;
                $scope.user.token = $state.params.id;
                var jsonData=$scope.user;
                $http({
                 url: serviceUrl,
                 method: 'POST',
                 data: jsonData,
                 headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "Accept": "application/json",
                 }
                }).success(function(data, status, headers, config) {
                
                  if (data == 200) {
                   $scope.activation_message = global_message.ActivatedMessage;
                  }else{
                   $scope.activation_message = global_message.ErrorInActivation;
                  }
                });
        }
       $scope.error_message=true;
       // function to submit the form after all validation has occurred            
     
    /**
        Angular Controller to Manage Authentication
        Created : 2016-05-03
        Created By: Lavlesh Mishra
        Module : Registration Function
    */

        $scope.submitForm = function() {
            $localStorage.regsuccess_message = '';
            // check to make sure the form is completely valid
            if ($scope.userForm.$valid) {
                
                
                var serviceUrl = webservices.getUserlogin;
                var jsonData=$scope.user;
                $http({
                 url: serviceUrl,
                 method: 'POST',
                 data: jsonData,
                 headers: {
                  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                  "Accept": "application/json",
                 }
                }).success(function(data, status, headers, config) {
                
                  if ((data.message=='error')||(data.user==undefined)) {
                   $scope.error="Error occurred during login.";
                   $scope.error_message=false;
                   $timeout(function() {
                        
                     $scope.error='';
                     $scope.error_message=true;
                   },3000);
                  }else{
                        $rootScope.class_status = 0;
                        $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=true;
                        $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=false;
                       
                        $rootScope.email=$localStorage.email=data.user.User.email;
                        $rootScope.name=$localStorage.name=data.user.User.first_name+" "+data.user.User.last_name;
                        $rootScope.access_token=$localStorage.access_token=data.user.User.access_token;
                        $rootScope.phone_no=$localStorage.phone_no=data.user.User.phone_no;
                        $rootScope.userId=$localStorage.userId=data.user.User.id;
                        $rootScope.address=$localStorage.address=data.user.User.address;
                        $state.go('dashboard');
                  }
                });
            }

        };
}).controller('signupcontroller',function($http,$scope,$rootScope,$location, $state,communicationService,$localStorage){

        // function to submit the form after all validation has occurred            
        $scope.unique  = false;
        $scope.message = "";
        $scope.unique_type  = 0; 
        $scope.user = {};
        // function to submit the form after all validation has occurred
        $rootScope.class_status = 1;
    /**
        Angular Controller to Manage Authentication
        Created : 2016-05-03
        Created By: Lavlesh Mishra
        Module : Registration Function
    */
        $scope.submitRegistrationform = function() {
            var serviceUrl = webservices.getUserregister;
            $scope.user.hosturl  = localbaseUrl;
            var jsonData=$scope.user;
        
            $http({
                url: serviceUrl,
                method: 'POST',
                data: jsonData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept": "application/json",
                }
            }).success(function(data, status, headers, config) {            
                if (data == 101) {
                 $scope.message = global_message.EmailExist;
                }
                else if (data == "err") {
                 $scope.message = global_message.SavingError;
                }
                else {
                 $scope.message = global_message.SignupSuccess;
                 alert(global_message.SignupSuccess);
                 $location.path('/login');
                }            
            });
        };
    /**
        Angular Controller to Manage Authentication
        Created : 2016-05-03
        Created By: Lavlesh Mishra
        Module : Check Unique Function
    */
        $scope.checkUnique = function() {
            var serviceUrl = webservices.checkUnique;
            if($scope.user.email != undefined && $scope.user.email !=''){
                var jsonData = $scope.user;
                $http({
                    url: serviceUrl,
                    method: 'POST',
                    data: jsonData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "Accept": "application/json",
                    }
                }).success(function(data, status, headers, config) {
                     if (data == 300) {
                     $scope.unique = global_message.EmailAvailable;
                     $scope.unique_type  = 1;
                     }
                     else{
                     $scope.unique = global_message.EmailExist;
                     $scope.unique_type  = 2;
                     }
                });
            }else{
                $scope.unique = '';
            }
        };
    
    }).controller('forgotcontroller',function($http,$scope,$rootScope,$location, $state,communicationService){
    /**
        Angular Controller to Manage Authentication
        Created : 2016-05-03
        Created By: Lavlesh Mishra
        Module : Forgot Password Function
    */    
        $scope.forgotPassword=function(){            
            $scope.message = false;
            var serviceUrl = webservices.forgetPassword;
            if($scope.user != undefined){
                $scope.user.hosturl  = localbaseUrl;
                var jsonData = $scope.user;
                $http({
                url: serviceUrl,
                method: 'POST',
                data: jsonData,
                headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept": "application/json",
                }
                }).success(function(data, status, headers, config) {
                     if (data == 200) {
                     $scope.message = global_message.ForgetPassword;
                     $scope.user.email = '';
                     }
                     else{
                     $scope.message = global_message.ForgetEmailError;
                     }
                });
            }
        }
        if ($state.params.id){
            $scope.user = {};
            $scope.message = false;
    /**
        Angular Controller to Manage Authentication
        Created : 2016-05-03
        Created By: Lavlesh Mishra
        Module : Set Password Function
    */ 
            $scope.setPassword=function(){
                
                if($scope.user.password == $scope.user.repassword){
                   var serviceUrl = webservices.resetPassword;
                   $scope.user.token  = $state.params.id;
                   $scope.user.password  = $scope.user.password;
                   var jsonData = $scope.user;
                        $http({
                            url: serviceUrl,
                            method: 'POST',
                            data: jsonData,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                                "Accept": "application/json",
                            }
                        }).success(function(data, status, headers, config) {
                            if (data == 200){
                                $scope.message = "Password has been changed successfully.";
                                $scope.errormessage = '';
                                alert($scope.message);
                                $location.path('/login');
                            }else{
                                $scope.message = "There some problem in server side to set new password , try after some time .";
                                $scope.errormessage = '';
                            }
                        })                   
                }
                else{
                    $scope.errormessage = "Please retype same password.";   
                }     
           }
        }
});

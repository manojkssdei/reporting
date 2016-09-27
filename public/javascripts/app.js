// app.js
/**************
CREATED :6 April 2016
CREATED BY: Deepak khokhar
Montive: It defined routes to call different files.It will provide you directions where to go.
********************/
'use strict';
angular.module("communicationModule", []);
// Declare app level module which depends on filters, and services

var routerApp = angular.module('alisthub', ['angular-loading-bar','ngRoute','autocomplete','ngSanitize','ui.router','ngStorage','oc.lazyLoad','communicationModule', 'ui.bootstrap','ckeditor','angularUtils.directives.dirPagination','angularjs-dropdown-multiselect','oitozero.ngSweetAlert','ngAnimate','ngDialog','ngLodash','angular-confirm','angular-svg-round-progressbar'])



.config(function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider,$httpProvider,cfpLoadingBarProvider) {
     $urlRouterProvider.otherwise('/login');
  delete $httpProvider.defaults.headers.common['X-Requested-With'];  

 cfpLoadingBarProvider.includeSpinner = false;
 cfpLoadingBarProvider.latencyThreshold = 500;

    // You can also load via resolve
    $stateProvider.
    //login screen
      state('login', {
        url: "/login", // root route
        views: {
          "lazyLoadView": {
            controller: 'loginController', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/login.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
      })
       //Authentication screen=================================
        .state('signup', {
            url: '/signup',
            
            views: {
          "lazyLoadView": {
            controller: 'signupcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/signup.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
        })
        
        //Email Confirmation screen=================================
        .state('confirm_email', {
            url: '/confirm_email/:id',
            views: {
          "lazyLoadView": {
            controller: 'loginController', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/login.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }        
        })
                
        //Authentication screen=================================
        .state('forgot-password', {
            url: '/forgot-password',
            
            views: {
          "lazyLoadView": {
            controller: 'forgotcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/forgot.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
        })
        // New Password
        .state('new_password', {
            url: '/forget_password/:id',
            
            views: {
          "lazyLoadView": {
            controller: 'forgotcontroller', // This view will use AppCtrl loaded below in the resolve
            templateUrl: 'modules/authentication/views/newpassword.html'
          }
        },
        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
          resources: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load files for an existing module
            return $ocLazyLoad.load('modules/authentication/controller.js');
          }]
        }
        })
            
         //User dashoard screen=================================
     

        .state('dashboard', {
            url: '/dashboard',
            
            views: {
                "lazyLoadView": {
                  controller: 'homeController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/home/views/dashboard.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
               authentication:routerApp.logauthentication,
               resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load(['modules/home/service.js','modules/graph_helpers/graphs/email_graph.js','modules/graph_helpers/graphs/sale_graph.js','modules/graph_helpers/graphs/fb_graph.js','modules/component/common.js'])/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/home/controller.js','stylesheets/home.css']);
                    })
               
              }]
            }
        })
        //Network Preview
        .state('reports', {
            url: '/reports',
            
            views: {
                "lazyLoadView": {
                  controller: 'reportsController', // This view will use AppCtrl loaded below in the resolve
                  //templateUrl: 'modules/reports/views/listing.html',
                  templateUrl: 'modules/reports/views/report.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/reports/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/reports/main_controller.js']);
                    })
               
              }]
            }
        }) 

        .state('combine_reports', {
            url: '/combine_reports',
            
            views: {
                "lazyLoadView": {
                  controller: 'combineReportController', // This view will use AppCtrl loaded below in the resolve
                  //templateUrl: 'modules/reports/views/listing.html',
                  templateUrl: 'modules/reports/views/combine_report.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/reports/service.js')/**/
                    .then(function(){
                    return $ocLazyLoad.load(['modules/reports/combine_controller.js']);
                    })
               
              }]
            }
        })
         
        .state('sales_reports', {
            url: '/sales_reports',
            
            views: {
                "lazyLoadView": {
                  controller: 'salesReportController', // This view will use AppCtrl loaded below in the resolve
                  //templateUrl: 'modules/reports/views/listing.html',
                  templateUrl: 'modules/reports/views/sales_report.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/reports/service.js')/**/
                    .then(function(){
                    return $ocLazyLoad.load(['modules/reports/sales_controller.js']);
                    })
               
              }]
            }
        })
         
        .state('facebook_reports', {
            url: '/facebook_reports',
            
            views: {
                "lazyLoadView": {
                  controller: 'facebookReportController', // This view will use AppCtrl loaded below in the resolve
                  //templateUrl: 'modules/reports/views/listing.html',
                  templateUrl: 'modules/reports/views/facebook_report.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/reports/service.js')/**/
                    .then(function(){
                    return $ocLazyLoad.load(['modules/reports/facebook_controller.js']);
                    })
               
              }]
            }
        })
        
        .state('email_reports', {
            url: '/email_reports',
            
            views: {
                "lazyLoadView": {
                  controller: 'emailReportController', // This view will use AppCtrl loaded below in the resolve
                  //templateUrl: 'modules/reports/views/listing.html',
                  templateUrl: 'modules/reports/views/email_report.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/reports/service.js')/**/
                    .then(function(){
                    return $ocLazyLoad.load(['modules/reports/email_controller.js']);
                    })
               
              }]
            }
        }) 
                
        .state('reportdetails', {
            url: '/reportdetails/:campaignid/:networkid',
            
            views: {
                "lazyLoadView": {
                  controller: 'keywordreportsController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/keywordreports/views/keywordslisting.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/keywordreports/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/keywordreports/controller.js']);
                    })
               
              }]
            }
        })


        .state('configureaccount', {
            url: '/configureaccount',
            
            views: {
                "lazyLoadView": {
                  controller: 'accountsController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/configureaccounts/views/index.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/configureaccounts/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/configureaccounts/controller.js']);
                    })
               
              }]
            }
        })

        .state('eventbrite', {
            url: '/eventbrite',
            
            views: {
                "lazyLoadView": {
                  controller: 'accountsController', // This view will use AppCtrl loaded below in the resolve
                  templateUrl: 'modules/configureaccounts/views/eventbrite.html'
                }
            },
            resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
              authentication:routerApp.logauthentication,
              resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                // you can lazy load files for an existing module
                return $ocLazyLoad.load('modules/configureaccounts/service.js')/*.then(function(){
                    //var $serviceTest = $injector.get("CustomerFirstLoad");
                           // return $serviceTest.testLoad(); // <-- CHANGED HERE
                    })*/.then(function(){
                    return $ocLazyLoad.load(['modules/configureaccounts/controller.js']);
                    })
               
              }]
            }
        })
        
        /////////////////////////help section/////////////////////////////
          .state('help', {
                      url: '/help',
                      
                      views: {
                          "lazyLoadView": {
                            controller: 'helpController',
                            templateUrl: 'modules/static_pages/views/help_view.html'
                          }
                      },
                       resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        authentication:routerApp.logauthentication,
                        resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                          // you can lazy load files for an existing module
                          return $ocLazyLoad.load('modules/static_pages/service.js').then(function(){
                          }).then(function(){
                          return $ocLazyLoad.load(['modules/static_pages/controller.js']);
                          })
                        }]
                      }
                    
                  })
          /////////////////////////site map section/////////////////////////////
          .state('site_map', {
                      url: '/site_map',
                      
                      views: {
                          "lazyLoadView": {
                            controller: 'helpController',
                            templateUrl: 'modules/static_pages/views/site_map.html'
                          }
                      },
                       resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        authentication:routerApp.logauthentication,
                        resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                          // you can lazy load files for an existing module
                          return $ocLazyLoad.load('modules/static_pages/service.js').then(function(){
                          }).then(function(){
                          return $ocLazyLoad.load(['modules/static_pages/controller.js']);
                          })
                        }]
                      }
                    
                  })
          
          /////////////////////////faq section/////////////////////////////
          .state('faq', {
                      url: '/faq',
                      
                      views: {
                          "lazyLoadView": {
                            controller: 'helpController',
                            templateUrl: 'modules/static_pages/views/faq.html'
                          }
                      },
                       resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        authentication:routerApp.logauthentication,
                        resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                          // you can lazy load files for an existing module
                          return $ocLazyLoad.load('modules/static_pages/service.js').then(function(){
                          }).then(function(){
                          return $ocLazyLoad.load(['modules/static_pages/controller.js']);
                          })
                        }]
                      }
                    
                  })
          
          
          /////////////////////////work for us section/////////////////////////////
          .state('work_for_us', {
                      url: '/work_for_us',
                      
                      views: {
                          "lazyLoadView": {
                            controller: 'helpController',
                            templateUrl: 'modules/static_pages/views/work_for_us.html'
                          }
                      },
                       resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        authentication:routerApp.logauthentication,
                        resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                          // you can lazy load files for an existing module
                          return $ocLazyLoad.load('modules/static_pages/service.js').then(function(){
                          }).then(function(){
                          return $ocLazyLoad.load(['modules/static_pages/controller.js']);
                          })
                        }]
                      }
                    
                  })
          
          /////////////////////////contact us section/////////////////////////////
          .state('contact_us', {
                      url: '/contact_us',
                      
                      views: {
                          "lazyLoadView": {
                            controller: 'contactController',
                            templateUrl: 'modules/contact_us/views/contact_us.html'
                          }
                      },
                        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        authentication:routerApp.logauthentication,
                        resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                          // you can lazy load files for an existing module
                          return $ocLazyLoad.load(['modules/contact_us/service.js']).then(function(){
                          }).then(function(){
                          return $ocLazyLoad.load(['modules/contact_us/controller.js']);
                          })
                        }]
                      }
                    
                  })
          /////////////////////////support section/////////////////////////////
          .state('support', {
                      url: '/support',
                      
                      views: {
                          "lazyLoadView": {
                            controller: 'helpController',
                            templateUrl: 'modules/static_pages/views/support.html'
                          }
                      },
                       resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        authentication:routerApp.logauthentication,
                        resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                          // you can lazy load files for an existing module
                          return $ocLazyLoad.load('modules/static_pages/service.js').then(function(){
                          }).then(function(){
                          return $ocLazyLoad.load(['modules/static_pages/controller.js']);
                          })
                        }]
                      }
                    
                  })
          
          /////////////////////////knowledgeBase section/////////////////////////////
          .state('knowledgeBase', {
                      url: '/knowledgeBase',
                      
                      views: {
                          "lazyLoadView": {
                            controller: 'helpController',
                            templateUrl: 'modules/static_pages/views/knowledgeBase.html'
                          }
                      },
                       resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        authentication:routerApp.logauthentication,
                        resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                          // you can lazy load files for an existing module
                          return $ocLazyLoad.load('modules/static_pages/service.js').then(function(){
                          }).then(function(){
                          return $ocLazyLoad.load(['modules/static_pages/controller.js']);
                          })
                        }]
                      }
                    
                  })
     
     /* Setting for view account screen */
          .state('view_account', {
               url: '/view_account',
               views: {
                   "lazyLoadView": {
                     controller: 'accountinfoController', // This view will use AppCtrl loaded below in the resolve
                     templateUrl: 'modules/myaccount/views/accountinfo/account_info.html'
                   }
               },
               resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                 resources: ['$ocLazyLoad', '$injector',function($ocLazyLoad, $injector) {
                   // you can lazy load files for an existing module
                   return $ocLazyLoad.load('modules/myaccount/service.js').then(function(){
                   }).then(function(){
                   return $ocLazyLoad.load(['modules/myaccount/myaccountcontroller.js']);
                   })
                 }]
               }
           })   
    
  }).run(['$rootScope', '$location','$state', '$localStorage', '$timeout',function($rootScope,$location, $state,$localStorage, $timeout) {
    //To add class
    if($localStorage.isuserloggedIn){
        $rootScope.menu=$rootScope.after_login_footer_div=false;
        $rootScope.footer_login_div=true;
        $rootScope.email=$localStorage.email;
        $rootScope.name=$localStorage.name;
        $rootScope.access_token=$localStorage.access_token;
        $rootScope.phone_no=$localStorage.phone_no;
        $rootScope.userId=$localStorage.userId;
        $rootScope.address=$localStorage.address;
        $rootScope.class_status = false;
        $state.go('dashboard');
    }else{
       $rootScope.menu=$rootScope.after_login_footer_div=true;
       $rootScope.footer_login_div=false; 
    }
    
    $rootScope.logout=function(){
        $localStorage.isuserloggedIn=$rootScope.isuserloggedIn=$rootScope.footer_login_div=false;
        $localStorage.menu=$localStorage.after_login_footer_div=$rootScope.menu=$rootScope.after_login_footer_div=true;
       localStorage.clear();
        $state.go('login');
    }
    
     $rootScope.checkPermission = function(per,method) {
          //console.log("Permissiondsad: " + per + "---" + method);
          var permitted = true; 

          if(per!=undefined && method!=undefined) {
            if($localStorage.userType == 'sellerSubUser') {
              var permitted = false; 
              if(method == 'add') {
                if(per.add == 1) {
                  permitted = true;
                }
              }

              if(method == 'edit') {
                if(per.edit == 1) {
                  permitted = true;
                }
              }

              if(method == 'delete') {
                if(per.delete == 1) {
                  permitted = true;
                }
              }

              if(method == 'view') {
                if(per.view == 1) {
                  permitted = true;
                }
              }
            } 
          }
          return permitted;
     };
     
     $rootScope.email='';
           
     $rootScope.stay_connected = function() {
        
        $rootScope.error_message_news = false;
        
        
        $rootScope.error_news = "";
        console.log($rootScope.email);
        if ($rootScope.email != "" && $rootScope.email != null && $rootScope.email !== undefined) {


            $http({
                url: webservices.stay_connected,
                method: 'POST',
                data: "email=" + $rootScope.email,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Accept": "application/json",
                }

            }).success(function(datae, status, headers, config) {
                if (datae && datae != "") {
                    $rootScope.email = "";
                    $rootScope.success = global_message.infoSaved;
                    $rootScope.success_message1 = true;
                    
                    $timeout(function(){
                     $rootScope.success = '';
                      $rootScope.success_message1 = false;
                     },5000)
                    
                } 
            });
        } else {
            $rootScope.error_message_news = true;
            $rootScope.error_news = "Enter email";
            /*$timeout(function(){
                     $rootScope.error_news = '';
                      $rootScope.error_message_news = false;
                     },5000)*/
        }
    }
     
    
    }]);
  
  routerApp.logauthentication = function($rootScope,$localStorage,$location,$http,$state,$timeout,$window) {
    
    $rootScope.permission = $localStorage.permission; 
    $rootScope.userType = $localStorage.userType; 

    if(!$localStorage.isuserloggedIn){
        $location.path("/login");
    }
       
};

routerApp.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
}).filter('tel', function () {
    return function (tel) {
        
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});
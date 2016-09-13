/**
Angular Controller to manage dashboard setup
Created : 2016-04-19
Created By: Lavlesh Mishra
Module : Dashboard Setup
*/

angular.module('alisthub').controller('userController', function($scope,$localStorage,$location,$rootScope,$injector,ngDialog,$uibModal,cfpLoadingBar,$state ,SweetAlert,$anchorScroll,$timeout) {


  $rootScope.class_status=false;
    if(window.innerWidth>767){  
      $scope.navCollapsed = false;    
    }else{ 
      $scope.navCollapsed = true;
      $scope.toggleMenu = function() {
        $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
      };    
  } 
  $localStorage.configureaccountid = '';
  var $serviceTest = $injector.get("users");
  $anchorScroll();
  $scope.facebookdata = true;
  $scope.searchcampiagn = '1';
  $scope.googledata = false;
  $scope.pagesize = '10';
  var data = {};
  
  // Get Associated Accounts 
 


  $scope.$watch('configaccount',function(){
      //cfpLoadingBar.start();
      
      
      var getcampaign = $scope.searchcampiagn;
      var data = {};
      data.apicall = 'update';
      if($scope.configaccount!==undefined) {
        $localStorage.configureaccountid = $scope.configaccount;
        console.log($localStorage.configureaccountid);
            if(getcampaign==2){
              $scope.facebookdata = false;
              $scope.googledata = true;
              data.user_id  = $localStorage.userId;
              data.network_id = getcampaign;
              data.configureaccountid = $localStorage.configureaccountid;
              $serviceTest.getgooglecampaignlisting(data,function(response){
                  if(response.code==200) {
                    $scope.googlecampaignlist = response.data;
                    $scope.googlecampaigndata = [];                             
                    angular.forEach(response.campaigndata, function(value, key){
                       $scope.googlecampaigndata.push(value.googlecampaignid);
                    });  
                    cfpLoadingBar.complete();
                    $scope.loadingclass = '';
                  }else{
                    $scope.googlecampaignlist = '';
                    cfpLoadingBar.complete();
                    $scope.loadingclass = '';
                  }
              });
            }else if(getcampaign==1){              
              $scope.facebookdata = true;
              $scope.googledata = false;
                data.user_id  = $localStorage.userId;
                data.network_id = 1;
                data.configureaccountid = $localStorage.configureaccountid;
                $serviceTest.getcampaignlist(data,function(response){
                  if(response.code == 200) {
                    $scope.campaignlist = response.result.data;
                    $scope.campaigndata = [];                             
                    angular.forEach(response.campaigndata, function(value, key){
                       $scope.campaigndata.push(value.fbcampaign_id);
                    });                      
                    cfpLoadingBar.complete();
                    $scope.loadingclass = '';
                  }else{
                    $scope.campaignlist = '';
                    cfpLoadingBar.complete();
                    $scope.loadingclass = '';
                  }
              });
            }
        }
  });
  
   //DELETED, ACTIVE, PAUSED

      $localStorage.campaignid = '';
      $localStorage.picturename='';
      $localStorage.object_id = '';
      $localStorage.networkid = '';
      $localStorage.startdate = '';
      $localStorage.enddate = '';
      $localStorage.campaigntitle = '';
      $localStorage.selectedval = '';
      $localStorage.fbcampaignid = '';
      $localStorage.groupId = '';
      $localStorage.groupname = '';
      $localStorage.actiontype = ''; 
      //$localStorage.startdate = '';
     // $localStorage.enddate = '';
      //$localStorage.scheduleads = '';
      $localStorage.audiencetypeval = '';
      $localStorage.userlist = '';
      $localStorage.importuserlist = '';
      $localStorage.facebookpageid = '';
      $localStorage.picturename = '';
      $localStorage.googlecampaignid = '';
      $localStorage.googlegroupid = '';


    $scope.removecampaign = function(campaignid){
        //cfpLoadingBar.start();
        var postdata = {};
        postdata.campaignid = campaignid;
        postdata.campaignstatus = 'DELETED';
        _.defer(function(){
             SweetAlert.swal({
             title: "Are you sure?",
             text: "The campaign will be deleted! sure to continue?",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: "#801517",confirmButtonText: "Delete",
             cancelButtonText: "cancel",
             closeOnConfirm: true,
             closeOnCancel: true, 
             allowOutsideClick: false }, 
             function(isConfirm){ 
                 if (isConfirm) {
                      //cfpLoadingBar.start();
                      var postdata = {};
                      postdata.campaignid = campaignid;
                      postdata.campaignstatus = 'DELETED';
                      postdata.user_id  = $localStorage.userId;
                      postdata.network_id = 1;
                      postdata.configureaccountid = $localStorage.configureaccountid;
                        $serviceTest.updatecampaignstatus(postdata,function(response){
                            if(response.code==200) {
                               $serviceTest.getcampaignlist(data,function(response){
                                      if(response.code==200) {
                                       $scope.campaignlist = response.result.data;
                                       SweetAlert.swal("Deleted!", "The campaign has been deleted.", "success");
                                      cfpLoadingBar.complete();
                                        //$scope.loadingclass = '';                         
                                      }
                                    cfpLoadingBar.complete();
                                });
                            }
                        });
                 }
              });
        });
    }


    $scope.editfacebookcampaign = function(campaignid){
      //cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var postdata = {};
      postdata.campaignid = campaignid; 
      $serviceTest.editfacebookcampaign(postdata,function(response){
        if(response.code==200) {
          var campaignlist = response.result[0];
          $localStorage.campaignid = campaignlist.id;
          $localStorage.picturename=campaignlist.adsimage;
          $localStorage.object_id = campaignlist.network_objective_id;
          $localStorage.networkid = campaignlist.network_id;         
          $localStorage.campaigntitle = campaignlist.title;         
          $localStorage.fbcampaignid = campaignlist.fbcampaign_id;     
          $localStorage.groupname = campaignlist.groupname; 
          $localStorage.facebookpageid = campaignlist.fbpage_id;
          $localStorage.fbappid = campaignlist.fbapp_id;
          $localStorage.groupId = campaignlist.fbadgroup_id;
          $localStorage.actiontype = 'update';             
          cfpLoadingBar.complete();
          $scope.loadingclass = '';
          //$location.path('/facebook');          
          //$timeout(function() {
             $state.go('facebook', null, {reload:true}); 
             $state.go('facebook', null, {reload:true}); 
          //}, 0);
          console.log('edit');
        }
      });
    }

    $scope.updatecampaign = function(campaignid,type){     
      var postdata = {};
        postdata.campaignid = campaignid;
        var setst = 'ACTIVE';
        if(type=='ACTIVE'){
          var setst = 'PAUSED';
        }  
        //cfpLoadingBar.start();
        postdata.campaignstatus = setst;
        postdata.user_id  = $localStorage.userId;
        postdata.network_id = 1;
        postdata.configureaccountid = $localStorage.configureaccountid;
        $serviceTest.updatecampaignstatus(postdata,function(response){
          if(response.code==200) {
                cfpLoadingBar.complete();
                SweetAlert.swal("", "Status updated successfully", "success"); 
              }
        });
    }


        $scope.removegooglecampaign = function(campaignid){
        var postdata = {};
        postdata.campaignid = campaignid;
        postdata.campaignstatus = 'DELETED';
   SweetAlert.swal({
   title: "Are you sure?",
   text: "The campaign will be deleted! sure to continue?",
   type: "warning",
   showCancelButton: true,
   confirmButtonColor: "#801517",confirmButtonText: "Delete!",
   cancelButtonText: "cancel",
   closeOnConfirm: true,
   closeOnCancel: true, 
   allowOutsideClick: false }, 
   function(isConfirm){ 
   if (isConfirm) {
        //cfpLoadingBar.start();
        var postdata = {};
        postdata.campaignid = campaignid;
        postdata.campaignstatus = 'DELETED';
        postdata.user_id  = $localStorage.userId;
        postdata.network_id = 2;
        postdata.configureaccountid = $localStorage.configureaccountid;

        $serviceTest.removegooglecampaign(postdata,function(response){
              if(response.code==200) {
                  data.user_id  = $localStorage.userId;
                  data.network_id = 2;
                  data.configureaccountid = $localStorage.configureaccountid;
                 $serviceTest.getgooglecampaignlisting(data,function(response){
                      if(response.code==200) {
                        $scope.googlecampaignlist = response.data;
                         SweetAlert.swal("Deleted!", "The campaign has been deleted.", "success");
                        cfpLoadingBar.complete();
                      }else{
                        $scope.googlecampaignlist = '';
                        cfpLoadingBar.complete();
                      }
                  });
              }else{
                cfpLoadingBar.complete();
              }
        });
      }
});  
      

    }



    $scope.updategooglecampaign = function(campaignid,type){     
      var postdata = {};
        postdata.campaignid = campaignid;
        var setst = 'ENABLED';
        if(type=='ENABLED'){
          var setst = 'PAUSED';
        }  
        //cfpLoadingBar.start();
        postdata.campaignstatus = setst;
        postdata.user_id  = $localStorage.userId;
        postdata.network_id = 2;
        postdata.configureaccountid = $localStorage.configureaccountid;
        $serviceTest.updategooglecampaignstatus(postdata,function(response){
          if(response.code==200) {
               SweetAlert.swal("", "Status updated successfully", "success"); 
                cfpLoadingBar.complete();
              }
        });
    }

    $scope.$watch('searchcampiagn',function(){        
        $scope.loadingclass = 'loadingclass';
        /*Load Configure accounts data*/
        var configdata = {}; 
        configdata.user_id  = $localStorage.userId;
        configdata.network_id = $scope.searchcampiagn;  
        $serviceTest.getassociatedaccount(configdata,function(response){
            if(response.code==200) {
              $scope.configureaccountdata = response.result;
              if(response.result[0]!==undefined) 
                  $scope.configaccount = response.result[0].profile_id;
              //$localStorage.configureaccountid = response.result[0].profile_id;              
            }
            $scope.loadingclass = '';
        });
        /*Load Configure accounts data*/
    });
      $scope.editgooglecampaign = function(campaignid){
      //cfpLoadingBar.start();
      $scope.loadingclass = 'loadingclass';
      var postdata = {};
      postdata.campaignid = campaignid;      
      $serviceTest.editgooglecampaign(postdata,function(response){
        if(response.code==200) {
          var campaignlist = response.result[0];
          $localStorage.campaignid = campaignlist.id;
          $localStorage.object_id = campaignlist.network_objective_id;
          $localStorage.networkid = 2;         
          $localStorage.campaigntitle = campaignlist.title;         
          $localStorage.googlecampaignid = campaignlist.googlecampaignid;
          $localStorage.googlegroupid = campaignlist.googlegroupid;      
          $localStorage.groupname = campaignlist.groupname;             
          cfpLoadingBar.complete();
          $scope.loadingclass = '';
          $state.go('google'); 
        }
      });
    }
 $scope.closemodal= function(){
          $uibModalInstance.dismiss('cancel');
    }
          /*==textbox modal==*/
        $scope.copygooglecampmodal = function (id,type) {
       $scope.campaignid = id;
       $localStorage.type = type;
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modules/home/views/copycamp.html',
          controller: 'popController',
          windowClass: 'campaign-copy-window',
          size: "sm",
          scope:$scope,
          resolve: {
            items: function () {
              return $scope.campaignid;
            }
          }
        });
        modalInstance.result.then(
            //close
            function (result) {
                var a = result;
            },
            //dismiss
            function (result) {
                var a = result;
            });
      };

    $scope.facebookmodal = function(campaignid,fieldstype){  
        //cfpLoadingBar.start();
        $scope.loadingclass = 'loadingclass';

        var postdata = {};
        $scope.campaignpoplist= [];
        postdata.campaignid = campaignid; 
        postdata.fieldstype = fieldstype;    
        $serviceTest.campaigndetails(postdata,function(response){
          if(response.code==200) {
              $scope.campaignpoplist = response.result[0];
               var campaignpoplistval = $scope.campaignpoplist;

              if(campaignpoplistval.device_platform!="" && campaignpoplistval.device_platform!=undefined)
              $scope.device_platform = campaignpoplistval.device_platform.replace(/,/g, ", ");
              else 
              $scope.device_platform = 'NA';

              if(campaignpoplistval.agegroup!="" && campaignpoplistval.agegroup!=undefined)
              $scope.agegroup = campaignpoplistval.agegroup.replace(/-/g, " - ");
              else
              $scope.agegroup = 'NA';
   
              if(campaignpoplistval.include_customaudiences!="" && campaignpoplistval.include_customaudiences!=undefined)
              $scope.includecustomaudiences = JSON.parse(campaignpoplistval.include_customaudiences);

              if(campaignpoplistval.exclude_customaudiences!="" && campaignpoplistval.exclude_customaudiences!=undefined)
              $scope.excludecustomaudiences = JSON.parse(campaignpoplistval.exclude_customaudiences);

              if(campaignpoplistval.include_targetpeoples!="" && campaignpoplistval.include_targetpeoples!=undefined)
              $scope.includetargetpeoples = JSON.parse(campaignpoplistval.include_targetpeoples); 

              if(campaignpoplistval.exclude_targetpeoples!="" && campaignpoplistval.exclude_targetpeoples!=undefined)
              $scope.excludetargetpeoples = JSON.parse(campaignpoplistval.exclude_targetpeoples);

              if(campaignpoplistval.include_locations_title!="" && campaignpoplistval.include_locations_title!=undefined)
              $scope.includelocation = JSON.parse(campaignpoplistval.include_locations_title);

              if(campaignpoplistval.exclude_locations_title!="" && campaignpoplistval.exclude_locations_title!=undefined)
              $scope.excludelocation = JSON.parse(campaignpoplistval.exclude_locations_title);
          
              $scope.showstartdate = formatsearchDate(campaignpoplistval.start_date);
              $scope.showenddate = formatsearchDate(campaignpoplistval.end_Date);
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
              ngDialog.open({
                  template: 'modules/home/views/facebook_views.html',
                  className: 'ngdialog-theme-default custom-facebook-class-modal',
                  scope: $scope
              });
          }
        });
    }  
   
     $scope.googlemodal = function(campaignid,fieldstype){  
        //cfpLoadingBar.start();
        $scope.loadingclass = 'loadingclass';

        var postdata = {};
        $scope.campaignpoplist= [];
        postdata.campaignid = campaignid; 
        postdata.fieldstype = fieldstype;    
        $serviceTest.campaigndetails(postdata,function(response){
          if(response.code==200) {
              $scope.campaignpoplist = response.result[0];
               var campaignpoplistval = $scope.campaignpoplist;

              if(campaignpoplistval.include_locations_title!="" && campaignpoplistval.include_locations_title!=undefined)
              $scope.includelocation = JSON.parse(campaignpoplistval.include_locations_title);

              if(campaignpoplistval.exclude_locations_title!="" && campaignpoplistval.exclude_locations_title!=undefined)
              $scope.excludelocation = JSON.parse(campaignpoplistval.exclude_locations_title);

              if(campaignpoplistval.selectedtopics!="" && campaignpoplistval.selectedtopics!=undefined)
              $scope.selectedtopics = JSON.parse(campaignpoplistval.selectedtopics);

              if(campaignpoplistval.selectedplacements!="" && campaignpoplistval.selectedplacements!=undefined)
              $scope.selectedplacements = JSON.parse(campaignpoplistval.selectedplacements);

              if(campaignpoplistval.selectedinterests!="" && campaignpoplistval.selectedinterests!=undefined)
              $scope.selectedinterests = JSON.parse(campaignpoplistval.selectedinterests);

              if(campaignpoplistval.textareaforkeywords!="" && campaignpoplistval.textareaforkeywords!=undefined)
              $scope.textareaforkeywords = JSON.parse(campaignpoplistval.textareaforkeywords);

              if(campaignpoplistval.selectedmobiles!="" && campaignpoplistval.selectedmobiles!=undefined)
              $scope.selectedmobiles = JSON.parse(campaignpoplistval.selectedmobiles);

              if(campaignpoplistval.selectedCarriers!="" && campaignpoplistval.selectedCarriers!=undefined)
              $scope.selectedCarriers = JSON.parse(campaignpoplistval.selectedCarriers);
          
              if(campaignpoplistval.agegroupselection!="" && campaignpoplistval.agegroupselection!=undefined)
              $scope.agegroupselection = JSON.parse(campaignpoplistval.agegroupselection);

              $scope.genderforsidebar();
              
              if(campaignpoplistval.gendergroupselection!="" && campaignpoplistval.gendergroupselection!=undefined)
              $scope.gendergroupselection = JSON.parse(campaignpoplistval.gendergroupselection);

              if(campaignpoplistval.parentalstatusesselection!="" && campaignpoplistval.parentalstatusesselection!=undefined)
              $scope.parentalstatusesselection = JSON.parse(campaignpoplistval.parentalstatusesselection);

              $scope.showstartdate = formatsearchDate(campaignpoplistval.start_date);
              $scope.showenddate = formatsearchDate(campaignpoplistval.end_Date);
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
              ngDialog.open({
                  template: 'modules/home/views/google_views.html',
                  className: 'ngdialog-theme-default custom-facebook-class-modal',
                  scope: $scope
              });
          }
        });
    }

    function sortNumber(a,b) {
      return a - b;
    }

$scope.genderforsidebar = function(){
      var agegroupselection = $scope.agegroupselection;
      agegroupselection.sort(sortNumber);
      var count = 0;
      var newarray = [];
      var verify = 0;
      var finalarray = {};
      finalarray[verify] = {};
      for(var i in agegroupselection){
          newarray[count] = {};
          newarray[count]['start'] = agegroupselection[i];
          if(agegroupselection[i]!=='503999' && agegroupselection[i]!=='503006'){
            if(i>0){
                var checkvalue = parseInt(finalarray[verify]['end']) + parseInt(1);
                if(checkvalue==newarray[count]['start']){
                    finalarray[verify]['end'] = newarray[count]['start'];
                }else{
                    verify = count;
                    finalarray[verify] = {};
                    finalarray[verify]['start'] = newarray[count]['start'];
                    finalarray[verify]['end'] = newarray[count]['start'];
                }
              }else{
                finalarray[verify]['start'] = newarray[count]['start'];
                finalarray[verify]['end'] = newarray[count]['start'];
              }
           var count = parseInt(count) + parseInt(1);
         }
      }

       $scope.combineage = [];
       var startage = {};
       var endage = {};
       for(i in finalarray){
        if( typeof finalarray[i]['start'] !== 'undefined' &&  typeof finalarray[i]['end'] !== 'undefined'){
              startage = $scope.agegroupswithkey[finalarray[i]['start']];
              endage = $scope.agegroupswithkey[finalarray[i]['end']];
              if(startage !==undefined && endage !== undefined){
                  var startage = startage.split('-');
                  var endage = endage.split('-');
                  var combine = startage[0]+'-'+endage[1];
                  $scope.combineage.push(combine);
              }
        }
      }
      var agerange65 = $scope.agegroupselection.indexOf("503006");
      //if(agerange65>-1) $scope.combineage.push($scope.agegroupswithkey["503006"]);

      var agerangeunknown = $scope.agegroupselection.indexOf("503999");
      //if(agerangeunknown>-1) $scope.combineage.push($scope.agegroupswithkey["503999"]);

      console.log($scope.combineage);
}

function getnetworkparentalstatus(){
      $serviceTest.getnetworkparentalstatus(2,function(response){
              if(response.code==200){
                var parentalstatuses = $scope.parentalstatuses = response.result;
                $scope.parentalstatuseswithkey = {};
                angular.forEach(parentalstatuses, function(value, key){        
                    $scope.parentalstatuseswithkey[value.value] = value.title;
                });
                //$scope.parentalstatusesselection = ["300","301","302"];
              }
        });
    }

    function getnetworkgendergroups(){
      $serviceTest.getnetworkgendergroups(2,function(response){
              if(response.code==200){
                var gendergroups = $scope.gendergroups = response.result;
                $scope.gendergroupwithkey = {};
                angular.forEach(gendergroups, function(value, key){        
                    $scope.gendergroupwithkey[value.value] = value.title;
                });
                //$scope.gendergroupselection = ["10","11","20"];
              }
        });
    }

    function getnetworkagegroups(){
      $serviceTest.getnetworkagegroups(2,function(response){
              if(response.code==200){
                var agegroups = $scope.agegroups = response.result;
                $scope.agegroupswithkey = {};
                angular.forEach(agegroups, function(value, key){        
                    $scope.agegroupswithkey[value.value] = value.title;
                });
                $scope.agegroups = response.result;
                //$scope.agegroupselection = ["503001","503002","503003","503004","503005","503006","503999"];
              }
        });
    }

    getnetworkagegroups();
    getnetworkgendergroups();
    getnetworkparentalstatus();

   function formatsearchDate(convertdate) {
      if(convertdate != '' && convertdate != undefined)
          var today = new Date(convertdate);
      else 
          var today = new Date();

      var dd = today.getDate();
      if(dd<10){ dd='0'+dd; }
      var month = parseInt(today.getMonth())+1;        
      if(month<10){  month='0'+month; } 
      return  month + "-" + dd + "-" + today.getFullYear();
    }

})

angular.module('alisthub').controller('popController', function($scope,$localStorage,$location,$rootScope,$injector,$uibModal,$timeout,$state,$uibModalInstance,cfpLoadingBar) {

    var $serviceTest = $injector.get("home");

    $scope.errorCampaigntitle = false;
    $scope.copygooglecampaign = function(campaign_id){
      var copypostdata = {};
      copypostdata.campaignid = campaign_id;  
      copypostdata.title = $scope.campaignnewname;
      copypostdata.type = $localStorage.type; 
      copypostdata.user_id  = $localStorage.userId;
      copypostdata.network_id = 1;
      copypostdata.configureaccountid = $localStorage.configureaccountid;
              
      if($localStorage.type=='facebook' && $scope.campaignnewname!==undefined && $scope.campaignnewname !==''){   
          //cfpLoadingBar.start();
          $scope.loadingclass = 'loadingclass';    
          var newpostdata = {};
          
          $serviceTest.copyfacebookcampaign(copypostdata,function(response){
            if(response.code==200) {
              newpostdata.campaignid = response.result;                
              $serviceTest.editfacebookcampaign(newpostdata,function(response){
                if(response.code==200) {
                  var campaignlist = response.result[0];
                  $localStorage.campaignid = campaignlist.id;
                  $localStorage.picturename=campaignlist.adsimage;
                  $localStorage.object_id = campaignlist.network_objective_id;
                  $localStorage.networkid = campaignlist.network_id;         
                  $localStorage.campaigntitle = campaignlist.title;         
                  $localStorage.fbcampaignid = campaignlist.fbcampaign_id;     
                  $localStorage.groupname = campaignlist.groupname; 
                  $localStorage.facebookpageid = campaignlist.fbpage_id;
                  $localStorage.fbappid = campaignlist.fbapp_id;
                  $localStorage.groupId = campaignlist.fbadgroup_id; 
                  $localStorage.actiontype = 'update';             
                  cfpLoadingBar.complete();
                  $scope.loadingclass = '';
                  $state.go('facebook', null, {reload:true});
                  $state.go('facebook', null, {reload:true}); 
                  console.log('copy');
                  //$state.go('facebook'); 
                }
              });
            }
          });
      }else if($scope.campaignnewname!==undefined && $scope.campaignnewname !==''){
          //cfpLoadingBar.start();
          $scope.loadingclass = 'loadingclass';
          $serviceTest.copygooglecampaign(copypostdata,function(response){
          if(response.code==200){
              var campaignlist = response.result;
              $localStorage.campaignid = campaignlist.insertId;
              $localStorage.object_id = campaignlist.network_objective_id;
              $localStorage.networkid = campaignlist.network_id;         
              $localStorage.campaigntitle = campaignlist.title;   
              $localStorage.groupname = campaignlist.groupname; 
              $localStorage.actiontype = 'update';            
              cfpLoadingBar.complete();
              $scope.loadingclass = '';
                if($localStorage.type=='facebook'){
                  //$state.go('facebook'); 
                  $state.go('facebook', null, {reload:true});
                  $state.go('facebook', null, {reload:true}); 
                }else {
                  $state.go('google'); 
                }
               
              } else if(response.code==409){
                $scope.errorCampaigntitle = true;
                $timeout(function() {
                       $scope.errorCampaigntitle = false;
                        }, 3000);
              }
            })
      }
    }
    /* closing modal with x button*/ 
    $scope.closemodal= function(){
          $uibModalInstance.dismiss('cancel');
    }

      $scope.copygooglecampmodal = function (id,type) {
       $scope.campaignid = id;
       $localStorage.type = type;
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'modules/home/views/copycamp.html',
          controller: 'popController',
          windowClass: 'campaign-copy-window',
          size: "sm",
          scope:$scope,
          resolve: {
            items: function () {
              return $scope.campaignid;
            }
          }
        });
        modalInstance.result.then(
            //close
            function (result) {
                var a = result;
            },
            //dismiss
            function (result) {
                var a = result;
            });
      };

      function sortNumber(a,b) {
    return a - b;
}

$scope.genderforsidebar = function(){
  var agegroupselection = $scope.agegroupselection;
    agegroupselection.sort(sortNumber);
    var count = 0;
    var newarray = [];
    var verify = 0;
    var finalarray = {};
    finalarray[verify] = {};
    for(var i in agegroupselection){
        newarray[count] = {};
        newarray[count]['start'] = agegroupselection[i];
        if(agegroupselection[i]!=='503999' && agegroupselection[i]!=='503006'){
          if(i>0){
              var checkvalue = parseInt(finalarray[verify]['end']) + parseInt(1);
              if(checkvalue==newarray[count]['start']){
                  finalarray[verify]['end'] = newarray[count]['start'];
              }else{
                  verify = count;
                  finalarray[verify] = {};
                  finalarray[verify]['start'] = newarray[count]['start'];
                  finalarray[verify]['end'] = newarray[count]['start'];
              }
            }else{
              finalarray[verify]['start'] = newarray[count]['start'];
              finalarray[verify]['end'] = newarray[count]['start'];
            }
         var count = parseInt(count) + parseInt(1);
       }
    }

       $scope.combineage = [];
       for(i in finalarray){
        if( typeof finalarray[i]['start'] !== 'undefined' &&  typeof finalarray[i]['end'] !== 'undefined'){
              var startage = $scope.agegroupswithkey[finalarray[i]['start']];
              var endage = $scope.agegroupswithkey[finalarray[i]['end']];
              var startage = startage.split('-');
              var endage = endage.split('-');
              var combine = startage[0]+'-'+endage[1];
              $scope.combineage.push(combine);
        }
      }
      var agerange65 = $scope.agegroupselection.indexOf("503006");
      if(agerange65>-1) $scope.combineage.push($scope.agegroupswithkey["503006"]);

      var agerangeunknown = $scope.agegroupselection.indexOf("503999");
      if(agerangeunknown>-1) $scope.combineage.push($scope.agegroupswithkey["503999"]);
}
     
})
.filter('underscoreless', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
}).filter('myFilter', function() {
   return function(input) {
     return input !== null ? input : 'NA';
   }
}).filter('mynewFilter', function() {
   return function(input) {
     return input !== null ? input : '0';
   }
});

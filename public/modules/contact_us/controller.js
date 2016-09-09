
angular.module('alisthub')
    .controller('contactController', function($scope, $localStorage, $http, $state, $location, ngTableParams, $timeout, $window, $rootScope, $injector, $stateParams) {

        var $serviceConnect = $injector.get("contact_us");

        //var eventService = $injector.get("events");

 $scope.locations = [];
    $scope.locations[0] = [];
    var latitude={lat: 37.990000, lng: -122.590000}
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center:latitude 
    });
    var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

     var marker = new google.maps.Marker({
          position: latitude,
          map: map,
          
        });
 google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>PO BOX 966 </strong><br>Fairfax, CA 94978</div>');
              infowindow.open(map, this);
            });


        $scope.data = {};
        $scope.unique=false;
        $scope.submitContact = function() {
            if ($localStorage.userId != undefined){
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                $serviceConnect.submitContact($scope.data, function(response) {
                
                    $scope.loader = false;
                    if (response.code == 200) {
                       $state.go('contact_us');                  
                        $scope.success_message1= true;
                        //$scope.error_message1=true;
                        
                        $scope.data={};
                        $scope.data.name="Enter your name";
                        $scope.data.email="test@example.com";
                        $scope.data.subject="Enter your subject";
                        $scope.success=global_message.infoSaved;
                        $scope.error='';
                        //$scope.data='';
                          $timeout(function() {
                              $scope.error='';
                              $scope.success_message1=false;
                              $scope.error_message1=false;
                              $scope.success='';
                           },3000);
                    } else {
                        $scope.error_message = true;
                        $scope.activation_message = global_message.ErrorInActivation;
                    }
                })
            }
        }

    });

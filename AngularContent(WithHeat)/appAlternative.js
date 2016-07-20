/* global i */
//Data
var diseases = [
    {
        city: 'Mysore',
        disease: 'Xerosis',
        locations: [
            {
                lat: 12.3000,
                long: 76.6500
            },
            {
                lat: 12.4000,
                long: 76.7500
            },
            {
                lat: 12.5000,
                long: 76.5500
            }
        ]
    }, {
        city: 'Bangalore',
        disease: 'Phrynoderm',
        locations: [
            {
                lat: 12.9667,
                long: 77.5667
            },
            {
                lat: 13.0667,
                long: 77.7667
            },
            {
                lat: 13.0667,
                long: 77.6667
            }
        ]
    }, {
        city: 'Mangalore',
        disease: 'Dental',
        locations: [
            {
                lat: 12.8700,
                long: 74.8800
            },
            {
                lat: 12.9700,
                long: 74.9800
            },
            {
                lat: 12.9700,
                long: 75.0800
            }
        ]
    }, {
        city: 'Shimoga',
        disease: 'Irregular bathing',
        locations: [
            {
                lat: 13.9333,
                long: 75.5667
            },
            {
                lat: 13.7333,
                long: 75.3667
            },
            {
                lat: 13.7333,
                long: 75.7667
            }
        ]
    }
    //{
    //     city: 'Hubli',
    //     disease: 'Aids',
    //     locations: [
    //         {
    //             lat: 15.3617,
    //             long: 75.0850
    //         },
    //         {
    //             lat: 15.5617,
    //             long: 75.2850
    //         },
    //         {
    //             lat: 15.1617,
    //             long: 75.2850
    //         }
    //     ]
    ];

//Module and Controller
var  heatmap = new google.maps.visualization.HeatmapLayer({});
angular.module('mapsApp', [])
    .controller('MapCtrl', function($scope, $http) {
            var mapOptions = {
            zoom: 11,
            center: new google.maps.LatLng(12.774546, 78.433523),
            mapTypeId: google.maps.MapTypeId.HYBRID
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];
        $scope.temp = [];
        
        var pointArray = new Array();
        var markers = [];
        var infoWindow = new google.maps.InfoWindow();
            $scope.names = '';

        var boundaries = [{lat:12.85751838,lng:78.39802135},
                            {lat:12.85748987,lng:78.39878029},
                            {lat:12.85674501, lng:78.39930563},
                            {lat:12.85594188, lng:78.39940361},
                            {lat:12.8546683,  lng:78.39843793},
                            {lat:12.85473745, lng:78.39784329},
                            {lat:12.85666134, lng:78.39457907},
                            {lat:12.85748734, lng:78.39502131}
                            ];

        var Poly = new google.maps.Polygon({
                        paths: boundaries,
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                        fillOpacity: 0.35
                        });
                Poly.setMap($scope.map);



        function sendToServer(str1) {
                $http.get("execute_query.php?name="+str1)
                    .then(function (response) {
                    $scope.names = response.data.diseases;
                    a = response.data.diseases;
                    //console.log(response.data.diseases);
                    var data = new Array();
                    for(var i=0;i<a.length;i++){
                        //console.log(a[i]['lat'],a[i]['lon']);
                         data[i] = new google.maps.LatLng(a[i]['lat'],a[i]['lon']);
                    }
                    var pointArray = new google.maps.MVCArray(data);
                    console.log(pointArray);

                    clearMap();
                    heatmap = new google.maps.visualization.HeatmapLayer({data: pointArray,map: $scope.map});
                    
                    
                    clearMarkers();
                    for(var i =0 ;i<data.length;i++){
                        //alert("call")
                        addMarkerWithTimeout(data[i],i*50)
                    }
            });
        }
function clearMap() {
    heatmap.setMap(null);
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

        function addMarkerWithTimeout(position, timeout) {
           // alert("called");
             window.setTimeout(function() {
                    markers.push(new google.maps.Marker({
                    position: position,
                    map: $scope.map,
                    animation: google.maps.Animation.DROP
    }));
  }, timeout);


}
        var createMarker = function(dis, locs) {

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(locs.lat, locs.long),
                title: dis.disease,
                animation: google.maps.Animation.DROP
            });
            marker.content = '<div class="infoWindowContent">' + dis.city + '</div>';
            marker.setVisible(false);

            google.maps.event.addListener(marker, 'check', function() {
                // infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                // infoWindow.open($scope.map, marker);

                marker.setVisible(true);
            });

            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);

            });

            google.maps.event.addListener(marker, 'uncheck', function() {
                marker.setVisible(false);

            });



            $scope.markers.push(marker);
            $scope.temp.push(marker.title);


        }

        for (i = 0; i < diseases.length; i++) {
            for (j = 0; j < diseases[i].locations.length; j++) {
                createMarker(diseases[i], diseases[i].locations[j])
            }
        }
        $scope.diseaseNames = [];

        $scope.diseaseNames = $.unique($scope.temp);

        $scope.mySet = new Set();
        $scope.hidden = true;
        
        //$scope.hidden = true;
        $scope.addMarker = function(e, selectedDisease, entity) {
            $scope.diseaseDisplayList = [];
            $scope.hidden = true;

            if ($scope.mySet.has(selectedDisease))
                $scope.mySet.delete(selectedDisease);
            else
                $scope.mySet.add(selectedDisease);

            $scope.checkedString = '';
            for (var item of $scope.mySet) {
                $scope.checkedString = $scope.checkedString + item + "$"
                $scope.diseaseDisplayList.push(item);
            }

            if($scope.diseaseDisplayList.length > 0)
                $scope.hidden = false;
            else
                $scope.hidden = true;

             $scope.checkedString = '';
            if($scope.mySet.has('Xerosis')){
                $scope.checkedString = $scope.checkedString+' and `xerosis`= 1'
            }
            if($scope.mySet.has('Phrynoderm')){
                $scope.checkedString = $scope.checkedString+' and `ph`= 1'
            }
            if($scope.mySet.has('Dental')){
                $scope.checkedString = $scope.checkedString+' and `oe_dc`= 1'
            }
            if($scope.mySet.has('Irregular bathing')){
                $scope.checkedString = $scope.checkedString+' and `ph_b`= 0'
            }
            
            sendToServer($scope.checkedString);
            console.log($scope.checkedString, $scope.diseaseDisplayList);
        }
    });

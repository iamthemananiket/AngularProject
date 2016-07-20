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
angular.module('mapsApp', [])
    .controller('MapCtrl', function($scope) {

        // var mapOptions = {
        //     zoom: 7,
        //     center: new google.maps.LatLng(15.0000, 78.0000),
        //     mapTypeId: google.maps.MapTypeId.HYBRID
        // }

        // $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // $scope.markers = [];
        $scope.temp = [];


        // var infoWindow = new google.maps.InfoWindow();

        var createMarker = function(dis, locs) {

            // var marker = new google.maps.Marker({
            //     map: $scope.map,
            //     position: new google.maps.LatLng(locs.lat, locs.long),
            //     title: dis.disease,
            //     animation: google.maps.Animation.DROP
            // });
            // marker.content = '<div class="infoWindowContent">' + dis.city + '</div>';
            // marker.setVisible(false);

            // google.maps.event.addListener(marker, 'check', function() {
            //     // infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            //     // infoWindow.open($scope.map, marker);

            //     marker.setVisible(true);
            // });

            // google.maps.event.addListener(marker, 'click', function() {
            //     infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            //     infoWindow.open($scope.map, marker);

            // });

            // google.maps.event.addListener(marker, 'uncheck', function() {
            //     marker.setVisible(false);

            // });



            // $scope.markers.push(marker);
            $scope.temp.push(dis.disease);


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
        $scope.addMarker = function(e, selectedDisease, entity) {
            // flag = true;
            // var i = 0;
            // while (i < $scope.markers.length) {
            //     if ($scope.markers[i].title === selectedDisease) {
            //         selectedMarker = $scope.markers[i];

            //         if (entity) {
            //             google.maps.event.trigger(selectedMarker, 'check');
            //         }
            //         else
            //             google.maps.event.trigger(selectedMarker, 'uncheck');
            //         i = i + 1;
            //     }
            //     else
            //         i = i + 1;
            //}
            //console.log(entity);
            // if (entity)
            //     $scope.checkedString = $scope.checkedString + selectedDisease + ' ';
            // else
            //     $scope.checkedString.replace(selectedDisease, '');

            // console.log($scope.checkedString);

            $scope.diseaseList = [];
            if ($scope.mySet.has(selectedDisease))
                $scope.mySet.delete(selectedDisease);
            else
                $scope.mySet.add(selectedDisease);

            $scope.checkedString = '';
            for (var item of $scope.mySet) {
                $scope.diseaseList.push(item);
                $scope.checkedString = $scope.checkedString + item + "$"
            }
            
            if($scope.diseaseList.length > 0)
                $scope.hidden = false;
            else
                $scope.hidden = true;
            //  $scope.checkedString = '';
            // if($scope.mySet.has('Xerosis')){
            //     $scope.checkedString = $scope.checkedString+' and `xerosis`= 1'
            // }
            // if($scope.mySet.has('Phrynoderm')){
            //     $scope.checkedString = $scope.checkedString+' and `ph`= 1'
            // }
            // if($scope.mySet.has('Dental')){
            //     $scope.checkedString = $scope.checkedString+' and `oe_dc`= 1'
            // }
            // if($scope.mySet.has('Irregular bathing')){
            //     $scope.checkedString = $scope.checkedString+' and `xerosis`= 1'
            // }


            console.log($scope.checkedString);


        }

    });

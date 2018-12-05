// Note: You must consent to sharing your location for the geolocation to track you.
var map, infoWindow;
function initMap() {
    //Initial location before detection begins.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.9517, lng: -92.3341},
        zoom: 12
    });
    
    //enable directionService
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    
    //university of missouri latitude and longitude
    mizzouLatLng = {
        lat: 38.9453,
        lng: -92.3288
    };
    
    infoWindow = new google.maps.InfoWindow;
    
    // Try geolocation. If successful, create markers and provide directions
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            infoWindow.setPosition(pos);
            infoWindow.setContent("You have been located.");
            infoWindow.open(map);
            map.setCenter(pos);
            
            //Add street view platform if geolocation worked
            panorama = new google.maps.StreetViewPanorama(
            document.getElementById('streetView'),
            {
              position: pos,
              pov: {heading: 165, pitch: 0},
              zoom: 1
            });
            
            //Set a marker for current location and the University of Missouri
            //Current location marker
            var marker1 = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Current Location'
            });
            
            //University of Missouri marker
            var marker2 = new google.maps.Marker({
                position: mizzouLatLng,
                map: map,
                title: 'University of Missouri'
            });

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
         
    } else {
        // Browser doesn't support Geolocation (Location Service)
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
}  

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed. Please allow Location Services.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
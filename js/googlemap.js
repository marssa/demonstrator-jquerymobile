var center;
var map = null;

function Newinitialize(lat,lng) {
center = new google.maps.LatLng(lat,lng);
var myOptions = {
zoom: 14,
center: center,
mapTypeId: google.maps.MapTypeId.SATELLITE
}
map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

}


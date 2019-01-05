// Dafault view

var myMap = L.map("map", {
  center: [
      32.82, -98.57
  ],
  zoom: 4
  
});

// Tile Layer

var geomap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoibXNjaHVlbHIiLCJhIjoiY2pwa2p0emo0MDIyODQybmxxNmxtOWluciJ9.W0AlrXR4AimkjoAt58vHnw"

}).addTo(myMap);

// Icon variables

var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Data import

d3.csv("testing.csv", function(data) {
  
  console.log(data)

  
      data.latitude = +data.latitude;
      data.longitude = +data.longitude;

// Marker Clusters and Popup

  var markers = L.markerClusterGroup()   

  data.forEach(function(e) {
      var popup = `<h2>${e.incident_characteristics_tertiary}</h2>
      Date: ${e.date}<br>
      Injured: ${e.n_injured}<br>
      Killed: ${e.n_killed}<br>
      Notes: ${e.notes}<br>
      More Info: <a href="${e.incident_url}" target="_blank" rel="noopener">LINK</a>`
      

// Marker Conditions
    if(e.total_casualties == 0 ) {

      var marker = L.marker([+e.latitude, +e.longitude], {icon: greenIcon});
    }

    if(e.total_casualties >= 1 ) {

      var marker = L.marker([+e.latitude, +e.longitude], {icon: redIcon});
    }

      marker.bindPopup(popup)

      markers.addLayer(marker);
})

myMap.addLayer(markers)

});
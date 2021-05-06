// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  BATTERY: new L.LayerGroup(),
  HOMICIDE: new L.LayerGroup(),
  ASSAULT: new L.LayerGroup(),
  ROBBERY: new L.LayerGroup(),
  SEX_OFFENSE: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [41.8781, -87.6298],
  zoom: 12,
  layers: [
    layers.BATTERY,
    layers.HOMICIDE,
    layers.ASSAULT,
    layers.ROBBERY,
    layers.SEX_OFFENSE
  ]
});
// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "BATTERY": layers.BATTERY,
  "HOMICIDE": layers.HOMICIDE,
  "ASSAULT": layers.ASSAULT,
  "ROBBERY": layers.ROBBERY,
  "SEX_OFFENSE": layers.SEX_OFFENSE
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });
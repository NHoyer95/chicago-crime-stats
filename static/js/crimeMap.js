console.log("loading crimeMap.js");

// Create the tile layer that will be the background of our map
// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "light-v10",
//   accessToken: API_KEY
// });

// Initialize all of the LayerGroups we'll be using
// var layers = {
//   BATTERY: new L.LayerGroup(),
//   HOMICIDE: new L.LayerGroup(),
//   ASSAULT: new L.LayerGroup(),
//   ROBBERY: new L.LayerGroup(),
//   SEX_OFFENSE: new L.LayerGroup()
// };

// Create the map with our layers
// var map = L.map("map-id", {
//   center: [41.8781, -87.6298],
//   zoom: 12,
//   layers: [
//     layers.BATTERY,
//     layers.HOMICIDE,
//     layers.ASSAULT,
//     layers.ROBBERY,
//     layers.SEX_OFFENSE
//   ]
// });
// Add our 'lightmap' tile layer to the map
// lightmap.addTo(map);

// Create an overlays object to add to the layer control
// var overlays = {
//   "BATTERY": layers.BATTERY,
//   "HOMICIDE": layers.HOMICIDE,
//   "ASSAULT": layers.ASSAULT,
//   "ROBBERY": layers.ROBBERY,
//   "SEX_OFFENSE": layers.SEX_OFFENSE
// };

// Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

/////////////////////
var myMap = L.map("map-id", {
  center: [41.8781, -87.6298],
  zoom: 13
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
}).addTo(myMap);


d3.json("/showData").then(function (data) {
  // console.log(data);

  var heatArray = []
  
  for (var i = 0; i < data.length; i++) {

    var lat = data[i].latitude;
    var lng = data[i].longitude;

    if(typeof lat != 'number' || typeof lng != 'number')
      continue;

    var location = [lat,lng];
    //console.log(location);

    heatArray.push(location);
    //console.log(heatArray);
  }
  //console.log(heatArray.map((x, i) => [i, typeof x[0] != 'number' || typeof x[1] != 'number']).filter(x => x[1]).map(x => x[0]));
  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 25,
  }).addTo(myMap);

});
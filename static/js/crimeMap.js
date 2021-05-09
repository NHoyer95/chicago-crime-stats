console.log("loading crimeMap.js");

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
});
 
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
});


// Initialize all of the LayerGroups we'll be using
var layers = {
  BATTERY: new L.LayerGroup(),
  HOMICIDE: new L.LayerGroup(),
  ASSAULT: new L.LayerGroup(),
  ROBBERY: new L.LayerGroup(),
  SEX_OFFENSE: new L.LayerGroup(),
  HeatMap: new L.LayerGroup()
};

//my map and layers 
var myMap = L.map("map-id", {
  center: [41.8781, -87.6298],
  zoom: 13,
  layers: [
    layers.BATTERY,
    layers.HOMICIDE,
    layers.ASSAULT,
    layers.ROBBERY,
    layers.SEX_OFFENSE,
    layers.HeatMap
  ]
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: lightmap,
  Dark: darkmap
};


// HEAT MAP
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


// Create an overlays object to add to the layer control
var overlays = {
  "BATTERY": layers.BATTERY,
  "HOMICIDE": layers.HOMICIDE,
  "ASSAULT": layers.ASSAULT,
  "ROBBERY": layers.ROBBERY,
  "SEX_OFFENSE": layers.SEX_OFFENSE,
  "Heat Map": layers.HeatMap
  
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(baseMaps, overlays).addTo(myMap);

// Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });


//func to fillter the different crimes types
d3.json("/showData").then(function (data) {
  // console.log(data);

  //filter for types of crime 
  function batteryType(battery) {
    return battery.primary_type == "BATTERY"
  }
  var crBattery = data.filter(batteryType);
  // console.log(crBattery);

  function homiciedType(homicied) {
    return homicied.primary_type == "HOMICIDE"
  }
  var crHomicied = data.filter(homiciedType);
  // console.log(crHomicied);

  function assaultType(assault) {
    return assault.primary_type == "ASSAULT"
  }
  var crAssault = data.filter(assaultType);
  // console.log(crAssault);

  function robberyType(robbery) {
    return robbery.primary_type == "ROBBERY"
  }
  var crRobbery = data.filter(robberyType);
  // console.log(crRobbery);

    for (var i = 0; i < crBattery.length; i++) {
      console.log(crRobbery)
      var lat = data[i].latitude;
      var lng = data[i].longitude;
      var type = data[i].primary_type
      console.log(type)

      var location = [lat,lng];
      // console.log(location);
        L.marker(location)
        .bindPopup("<h1>" + type + "</h1> ")
        .addTo(myMap);

    }


  function sex_offenseType(sex_offense) {
    return sex_offense.primary_type == "SEX_OFFENSE"
  }
  var crSex_offens = data.filter(sex_offenseType);
  // console.log(crSex_offens);


});



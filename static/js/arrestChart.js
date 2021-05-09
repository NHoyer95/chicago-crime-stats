console.log("arrestChart.js loaded");

d3.json("/arrestChartData", function(data){
console.log(data); 


function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}


var primaryTypes = groupBy(data, crime => crime.primary_type);

// Homicide stats
var homicide = primaryTypes.get("HOMICIDE");
var numberHomicide = homicide.length;

var homicideArrest = groupBy(homicide, arrest => arrest.arrest).get(true);
var numHomicideArrest = homicideArrest.length;
var homicideNoArrest = groupBy(homicide, arrest => arrest.arrest).get(false);
var numHomicideNoArrest = homicideNoArrest.length;

// Battery stats
var battery = primaryTypes.get("BATTERY")
var numberBattery = battery.length;

var batteryArrest = groupBy(battery, arrest => arrest.arrest).get(true);
var numBatteryArrest = batteryArrest.length;
var batteryNoArrest = groupBy(battery, arrest => arrest.arrest).get(false);
var numBatteryNoArrest = batteryNoArrest.length;

// var battery = primaryTypes.get("BATTERY")
// var numberBattery = battery.length;

// var batteryArrest = groupBy(battery, arrest => arrest.arrest).get(true);
// var numBatteryArrest = batteryArrest.length;
// var batteryNoArrest = groupBy(battery, arrest => arrest.arrest).get(false);
// var numBatteryNoArrest = batteryNoArrest.length;

console.log(numberBattery);

var arrestSunburst = [{
  type: "sunburst",
  labels: ["Homicide", "Homicide Arrest = True", "Homicide Arrest = False", 
  "Battery", "Battery Arrest = True", "Battery Arrest = False"],
  parents: ["", "Homicide", "Homicide", "", "Battery", "Battery"],
  values:  [numberHomicide, numHomicideArrest, numHomicideNoArrest, numberBattery, numBatteryArrest, numBatteryNoArrest],
  outsidetextfont: {size: 20, color: "#377eb8"},
  leaf: {opacity: 0.4},
  marker: {line: {width: 2}},
  branchvalues: 'total'
}];

var layout = {
  margin: {l: 0, r: 0, b: 0, t: 0},
  width: 500,
  height: 500
};


Plotly.newPlot('arrestChart', arrestSunburst, layout)});

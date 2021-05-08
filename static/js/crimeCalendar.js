//d3.json("/crimeCalendar").then((data) => {console.log(data);});

d3.json("/crimeCalendar", function (data){console.log(data);});
//define variables

// function createLineGraph(id) {
//     console.log("createLineGraph", id)
//     d3.json("/crimeCalendar").then((data) => {
//     var date = data.date
//     var homicide = 
//     var battery = 
//     var assult = 
//     var robbery = 
//     var sex_offense = 

// //Display the default plot: Overall violent crime in Chicago
// function init () {
//     var data = [{
//         x: "Date",
//         y: "Crime in Chicago 2021",
//         type: "line"

//     }];

//     //create layout for line graph
//     var layout = {};

//     plotly.newPlot("line", data, layout); 
// }

// function getData() {
//     var dropdownMenu 

//     var data = [];

//     if (dataset == 'date') {
//         data = date; 
//     }

//     else if (dataset == 'homicide') {
//         data = homicide; 
//     }

//     else if (dataset == 'battery') {
//         data = battery; 
//     }

//     else if (dataset == 'assult') {
//         data = assult; 
//     }

//     else if (dataset == 'robbery') {
//         data = robbery; 
//     }

//     else if (dataset == 'homicide') {
//         data = homicide; 
//     }

// //call function to update the chart
// updatePlotly(data); 
 
// //update the plot values
// function updatePlotly(newdata) {
// 	Plotly.restyle(“line”, “values”, [newdata]);
// }



// }
// })
// init ();
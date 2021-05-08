console.log("arrestChart.js loaded");

function DrawArrestChart()
d3.json("/arrestChartData", function (data) {

    // ... and dump that JSON to the console for inspection
    console.log(data); 
    
    // function(err, rows){
    //     function unpack(rows, key) {
    //     return rows.map(function(row) {return row[key]})
    //   }
      
    //     var chartData = [{
    //           type: "sunburst",
    //           maxdepth: 2,
    //           ids: unpack(rows, 'ids'),
    //           labels: unpack(rows, 'labels'),
    //           parents: unpack(rows, 'parents'),
    //           textposition: 'inside',
    //           insidetextorientation: 'radial'
    //     }]
      
    //     var layout = {margin: {l: 0, r: 0, b: 0, t:0}}
      
    //     Plotly.newPlot('myDiv', data, layout)
    //   })
});

// function InitDashboard() {

//     console.log("InitDashboard()");

//     //Draw the graphs/charts
//     arrestChart();
    
// }

// InitDashboard();
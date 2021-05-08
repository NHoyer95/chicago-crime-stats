//define variables
var date = 
var homicide =
var battery = 
var assult = 
var robbery = 
var sex_offense = 

//Display the default plot: Overall violent crime in Chicago
function init () {
    var data = [{
        x: 
        y: 
        type: "line"

    }];

    //create layout for line graph
    var layout = {};

    plotly.newPlot("line", data, layout); 
}

function getData() {
    var dropdownMenu 

    var data = [];

    if (dataset == 'date') {
        data = date; 
    }

    else if (dataset == 'homicide') {
        data = homicide; 
    }

    else if (dataset == 'battery') {
        data = battery; 
    }

    else if (dataset == 'assult') {
        data = assult; 
    }

    else if (dataset == 'robbery') {
        data = robbery; 
    }

    else if (dataset == 'homicide') {
        data = homicide; 
    }




}
init ();
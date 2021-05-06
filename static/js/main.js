// Show that we've loaded the JavaScript file
console.log("Loaded main.js");

//HTML
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


// Dom Example for place holder for charts and table
// Query the endpoint that returns a JSON ...
// d3.json("/crimeMap").then(function (data) {
//     console.log(data)
 
   
// });

// d3.json("/crimeData").then(function (data) {
//     console.log(data)
 
   
// });


// //  graph 1
// function crimeCalendar(data) {
//     // console.log(`crimeCalendar(${data})`);

    
// };

// //  graph 2
// function arrestChart(data) {
//     // console.log(`arrestChart(${data})`);

    
// };

// // Show map
// function crimeMap(data) {
//     // console.log(`crimeMap(${data})`);

    
// };

// // Show Meta Data
// // function showData(data) {
// //     // console.log(`showData(${data})`);

    
// // };


// // Event Handler - place holder
// function optionChanged(data) {
//     // console.log(`User selected ${data}`);

//     crimeCalendar(data);
//     arrestChart(data);
//     crimeMap(data);
//     showData(data);

// }

// // Calling all the function 
// // place holders for the graphs or charts we want to create
// function InitDashboard() {
//     // console.log("InitDashboard()");

//     //Draw the graphs/charts
//     crimeCalendar();
//     arrestChart();
//     crimeMap();
//     showData();
    
// }

// InitDashboard();
var data = d3.csv("../data/QueryResults.csv")
	.row(function(d) { return {UserId: +d.UserId, Questions: +d.Questions, Answers: +d.Answers, Reputation: +d.Reputation}; }); //+ converts the string to a number and is faster than parsing

var margin = {top: 20, right: 80, bottom: 120, left: 90},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom,
	pointMaxSize = 120;

var x = d3.scale.linear()
				.range([0, width]);

var y = d3.scale.linear()
				.range([height, 0]);

var size = d3.scale.linear()
	.range([1, pointMaxSize]);

var color = d3.scale.linear()
					.range(['#F4C435', '#7F0201']);
					
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	.tickPadding(45)
	.innerTickSize(30);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
	.tickPadding(20)
	.innerTickSize(15);
		
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	var tooltip = d3.select("#hoverDescription");
	
	data.get(function(error, rows) { 

	    x.domain(d3.extent(rows, function(d) { return d.Answers; })).nice();
	    y.domain(d3.extent(rows, function(d) { return d.Questions; })).nice();	        	
		size.domain(d3.extent(rows, function(d) { return d.Reputation; })).nice();
		color.domain(d3.extent(rows, function(d) { return d.Reputation; }));			
		
		colorlegend("#linearLegend", color, "linear", {title: "Reputation", boxHeight: 50, boxWidth: 100, linearBoxes: 5});

		svg.selectAll(".dot")
			.data(rows)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", function(d) {return size(d.Reputation); })
			.attr("cx", function(d) { return x(d.Answers); })
			.attr("cy", function(d) { return y(d.Questions); })
			.style("fill", function(d) { return color(d.Reputation); })
		    .append("svg:title") //any sort of hiding showing DOM based tooltips is causing performance problems with this many nodes, so using 'title' instead
		    .text(function(d, i) { return "Questions: " + d.Questions + " Answers: " + d.Answers + " Reputation: " + d.Reputation; });
			
			
	    svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -15)
			.style("text-anchor", "end")
			.text("Answers");
	
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 15)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Questions");
		
			d3.select("#loading").style("display", "none");
		
	});
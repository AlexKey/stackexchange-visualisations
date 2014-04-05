var data = d3.csv("../data/QueryResults.csv")
	.row(function(d) { return {UserId: +d.UserId, Questions: +d.Questions, Answers: +d.Answers, Reputation: +d.Reputation}; }); //+ converts the string to a number and is faster than parsing

	
	
var margin = {top: 20, right: 40, bottom: 30, left: 60},
    width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var size = d3.scale.linear()
	.range([1, 50]);

var color = d3.scale.linear()
					.range(['white','darkred']);
					
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
		
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	data.get(function(error, rows) { 

	    x.domain(d3.extent(rows, function(d) { return d.Answers; })).nice();
	    y.domain(d3.extent(rows, function(d) { return d.Questions; })).nice();
		size.domain(d3.extent(rows, function(d) { return d.Reputation; })).nice();
		color.domain(d3.extent(rows, function(d) { return d.Reputation; })).nice();
		
	    svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text("Answers");
		
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 2)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Questions");
			

		svg.selectAll(".dot")
			.data(rows)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("r", function(d) {return size(d.Reputation); })
			.attr("cx", function(d) { return x(d.Answers); })
			.attr("cy", function(d) { return y(d.Questions); })
			.style("fill", function(d) { return color(d.Reputation); });

	
	});
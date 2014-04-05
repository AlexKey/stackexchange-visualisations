var data = d3.csv("../data/QueryResults.csv")
	.row(function(d) { return {UserId: +d.UserId, Questions: +d.Questions, Answers: +d.Answers, Reputation: +d.Reputation}; }) //+ converts the string to a number and is faster than parsing
	.get(function(error, rows) { console.log(rows); });
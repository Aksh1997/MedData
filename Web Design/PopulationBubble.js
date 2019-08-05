(function() {
	var width = 500, 
		height = 500;

	var svg = d3.select("#chart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")

	// Adding Color to the Bubbles (for each country)
	var myColor = d3.scaleOrdinal()
				.domain([]) 			// "country1", "country2"
				.range(d3.schemeSet2);

	// Mentioning the population min and max range
	var radiusScale = d3.scaleSqrt().domain([10000000, 999999999]).range([10, 80])

	// the simulation is a collection of forces
	// about where we want our circles to go
	// and how we want our circles to interact
	// STEP ONE: Get the circles to the middle
	// STEP TWO: Don't have them collide!!!
	var simulation = d3.forceSimulation()
		.force("x", d3.forceX(width / 2).strength(0.05))
		.force("y", d3.forceY(height / 2).strength(0.05))
		.force("collide", d3.forceCollide(function(d) {
			return radiusScale(d.population) + 1;
		}))

	d3.csv("countries.csv").then(function(datapoints) {
  		console.log(datapoints);

  		var chart = svg.selectAll(".node")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "node")
			.attr("r", function(d) {
				return radiusScale(d.population);	// radius is calculated from the population range
			})
			.style("fill", function(d) {
				return myColor(d.country);    		// Adding color to each country
			})
			.style("opacity", "0.7")				// Color opacity
		    .attr("stroke", "white")				// White Border Stroke
		    .style("stroke-width", "2px")
			.on('click', function(d) {
				console.log(d)						// On every click of the bubble the relevant data will be displayed in the console
			})

		// Adding text in the bubble
			// circles.append("text")
			// .attr("dy", ".3em")
			// .style("text-anchor", "middle")
			// .style("pointer-events", "none")
			// .text(function(d) {
			// 	return d.country.substring(0, d.r / 3);
			// })


		
		simulation.nodes(datapoints)
			.on('tick', ticked)

		function ticked() {
			chart
				.attr("cx", function(d) {
					return d.x
				})
				.attr("cy", function(d) {
					return d.y
				})
		}
	});

}) ();
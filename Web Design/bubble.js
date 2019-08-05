(function() {
	var width = 500, 
		height = 500;

	var svg = d3.select("#chart")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform", "translate(0,0)")

	var radiusScale = d3.scaleSqrt().domain([1000000, 99999999]).range([10, 80])

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

  		var circles = svg.selectAll(".country")
			.data(datapoints)
			.enter().append("circle")
			.attr("class", "country")
			.attr("r", function(d) {
				return radiusScale(d.population);
			})
			.attr("fill", "lightblue")
			.style("opacity", "0.7")
		    .attr("stroke", "white")
		    .style("stroke-width", "2px")
			.on('click', function(d) {
				console.log()
			})
			// .attr("cx", 100)
			// .attr("cy", 300)

		simulation.nodes(datapoints)
			.on('tick', ticked)

		function ticked() {
			circles
				.attr("cx", function(d) {
					return d.x
				})
				.attr("cy", function(d) {
					return d.y
				})
		}
	});

}) ();
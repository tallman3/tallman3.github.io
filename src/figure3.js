var figure3 = {};
figure3.load = function() {
// Load data.
    d3.csv('/data/sectors.csv', figure3.type).then(res => {
        figure3.ready(res);
    });
}

figure3.type = function (d) {
    return {
      sector: d.Sector,    
      economy: +d.Economy
    };
}

figure3.ready = function(stats) {
    // Dimensions.
    const margin = { top: 10, right: 60, bottom: 40, left: 60 };
    const width = 1000 - margin.right - margin.left;
    const height = 200 - margin.top - margin.bottom;  
  
    const colwidth = (width / stats.length) - 2;
  
    var xScale = d3
                .scaleBand()
                .domain(stats.map(d => d.sector))
                .rangeRound([0, width - colwidth])
                .paddingInner(0.15);
    
    var yScale = d3
                .scaleLinear()
                .domain([0,d3.max(stats.map(d=> d.economy))])
                .range([height, 0]);

    var groups = d3.select("#figure3")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll("rect")
        .data(stats);

    var groupsEnter = groups.enter();
    groupsEnter.append("rect")
        .attr("class", function (d) {return d.sector.replace(" ", "").toLowerCase();})
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.economy) })
        .attr("x", function (d) { return xScale(d.sector) + 1; })
        .attr("y", function (d) { return height - (height - yScale(d.economy)); });

    d3.select("#figure3").append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(yScale));
    d3.select("#figure3").append("g")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
        .call(d3.axisBottom(xScale));
}




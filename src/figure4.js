var figure4 = {};
figure4.load = function() {
// Load data.
    d3.csv('/data/sectors.csv', figure4.type).then(res => {
        figure4.ready(res);
    });
}

figure4.type = function (d) {
    return {
      sector: d.Sector,    
      economy: +d.Economy,
      djt07095: +d.DJT07095,
      rbf1150: +d.RBF1150,
      bmo31146: +d.BMO31146,
      bmo31242: +d.BMO31242,
      cig11098: +d.CIG11098,
      rbf1490: +d.RBF1490
    };
}

figure4.prepareData = function(stats) {
    let startEconomy = 0;
    let startDjt07095 = 0;
    let startRbf1150 = 0;
    let startBmo31146 = 0;
    let startBmo31242 = 0;
    let startCig11098 = 0;
    let startRbf1490 = 0;

    for(let i = 0; i< stats.length; i++)
    {
        stats[i].startEconomy = startEconomy;
        startEconomy += stats[i].economy;
        stats[i].startDjt07095 = startDjt07095;
        startDjt07095 += stats[i].djt07095;
        stats[i].startRbf1150 = startRbf1150;
        startRbf1150 += stats[i].rbf1150;
        stats[i].startBmo31146 = startBmo31146;
        startBmo31146 += stats[i].bmo31146;
        stats[i].startBmo31242 = startBmo31242;
        startBmo31242 += stats[i].bmo31242;
        stats[i].startCig11098 = startCig11098;
        startCig11098 += stats[i].cig11098;
        stats[i].startRbf1490 = startRbf1490;
        startRbf1490 += stats[i].rbf1490;
    }
    return stats;
}

figure4.ready = function(res) {
    
    stats = figure4.prepareData(res);
 
    // Dimensions.
    const margin = { top: 10, right: 60, bottom: 40, left: 60 };
    const width = 1000 - margin.right - margin.left;
    const height = 300 - margin.top - margin.bottom;  
  
    const names = ["Economy","DJT07095","RBF1150","BMO31146","BMO31242","CIG11098","RBF1490"]  
    var xScale = d3
                .scaleBand()
                .domain(names)
                .rangeRound([0, width])
                .paddingInner(0.15);
    
    var yScale = d3
                .scaleLinear()
                .domain([0,100])
                .range([height, 0]);

    var tooltip = d3.select("#tooltip");

    var groups = d3.select("#figure4")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll("rect");

        
    var groupsEnter = groups.data(stats).enter();
    groupsEnter.append("rect")
        .attr("class", function (d) {return d.sector.replace(" ", "").toLowerCase();})
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.economy) })
        .attr("x", function (d) { return xScale("Economy"); })
        .attr("y", function (d) { return height - (height - yScale(d.economy + d.startEconomy)); })
        .on("mouseenter", function(d) {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(`${d.sector}<br\>${d.economy}%`)
        })
        .on("mouseleave", function() { 
            tooltip.style("opacity", 0)
        });


        groupsEnter.append("rect")
        .attr("class", function (d) {return d.sector.replace(" ", "").toLowerCase();})
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.djt07095) })
        .attr("x", function (d) { return xScale("DJT07095"); })
        .attr("y", function (d) { return height - (height - yScale(d.djt07095 + d.startDjt07095)); })
        .on("mouseenter", function(d) {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(`${d.sector}<br\>${d.djt07095}%`)
        })
        .on("mouseleave", function() { 
            tooltip.style("opacity", 0)
        });

        groupsEnter.append("rect")
        .attr("class", function (d) {return d.sector.replace(" ", "").toLowerCase();})
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.rbf1150) })
        .attr("x", function (d) { return xScale("RBF1150"); })
        .attr("y", function (d) { return height - (height - yScale(d.rbf1150 + d.startRbf1150)); })
        .on("mouseenter", function(d) {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(`${d.sector}<br\>${d.rbf1150}%`)
        })
        .on("mouseleave", function() { 
            tooltip.style("opacity", 0)
        });


        groupsEnter.append("rect")
        .attr("class", function (d) {return d.sector.replace(" ", "").toLowerCase();})
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.bmo31146) })
        .attr("x", function (d) { return xScale("BMO31146"); })
        .attr("y", function (d) { return height - (height - yScale(d.bmo31146 + d.startBmo31146)); })
        .on("mouseenter", function(d) {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(`${d.sector}<br\>${d.bmo31146}%`)
        })
        .on("mouseleave", function() { 
            tooltip.style("opacity", 0)
        });


        groupsEnter.append("rect")
        .attr("class", function (d) {return d.sector.replace(" ", "").toLowerCase();})
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.bmo31242) })
        .attr("x", function (d) { return xScale("BMO31242"); })
        .attr("y", function (d) { return height - (height - yScale(d.bmo31242 + d.startBmo31242)); })
        .on("mouseenter", function(d) {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(`${d.sector}<br\>${d.bmo31242}%`)
        })
        .on("mouseleave", function() { 
            tooltip.style("opacity", 0)
        });


        groupsEnter.append("rect")
        .attr("class", function (d) {return d.sector.replace(" ", "").toLowerCase();})
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.cig11098) })
        .attr("x", function (d) { return xScale("CIG11098"); })
        .attr("y", function (d) { return height - (height - yScale(d.cig11098 + d.startCig11098)); })
        .on("mouseenter", function(d) {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(`${d.sector}<br\>${d.cig11098}%`)
        })
        .on("mouseleave", function() { 
            tooltip.style("opacity", 0)
        });


        groupsEnter.append("rect")
        .attr("class", function (d) {return d.sector.replace(" ", "").toLowerCase();})
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.rbf1490) })
        .attr("x", function (d) { return xScale("RBF1490"); })
        .attr("y", function (d) { return height - (height - yScale(d.rbf1490 + d.startRbf1490)); })
        .on("mouseenter", function(d) {
            tooltip.style("opacity", 1)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .html(`${d.sector}<br\>${d.rbf1490}%`)
        });



    d3.select("#figure4").append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(yScale));
    d3.select("#figure4").append("g")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
        .call(d3.axisBottom(xScale));
}

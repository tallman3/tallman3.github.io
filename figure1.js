var figure1 = {};
figure1.popUpMessage1 = "Although the Investment returns look very volatile,<br>the long-term return is worth the risk<br>(hover over any bar to see its exact amount)"
figure1.popUpMessage2 = "Savings rates have not exceeded inflation<br>since 2009.  This means that savers have been<br>losing money every year for over a decade."

figure1.load = function() {
// Load data.
    d3.csv('investsave.csv', figure1.type).then(res => {
        figure1.ready(res);
    });
}

figure1.type = function(d) {
    return {
      year: +(d.Year),    
      invest: +d.Invest,
      savings: +d.Savings,
      tse: +d.TSE,
      cpb: +d.CPB,
      cpi: +d.CPI
    };
}

// Main function
figure1.ready = function(stats) {
  // Dimensions.
  const margin = { top: 20, right: 60, bottom: 120, left: 40 };
  const width = 800 - margin.right - margin.left;
  const height = 600 - margin.top - margin.bottom;  

  const xScale = d3
                .scaleBand()
                .domain([1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019])
                .range([0, width]);
     
  const yScale = d3
                .scaleLinear()
                .domain([-35, 35])
                .range([height, 0]);

  var tooltip = d3.select("#tooltip");
  var popup1 = d3
                .select('#popup1')
                .style("left", (width - 30) + "px")
                .style("top", (height * 2 - 300) + "px")
                .html(figure1.popUpMessage1);
  var popup2 = d3
                .select('#popup2')
                .style("left", (width - 310) + "px")
                .style("top", (height * 2 - 550) + "px")
                .html(figure1.popUpMessage2);
            
            d3.select("#figure1div")                       
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .on("mouseenter", function () {
                popup1.style("opacity", 1)
                popup2.style("opacity", 1)
                    
            })
            .on("mouseleave", function() { 
                popup1.style("opacity", 0)
                popup2.style("opacity", 0)
                tooltip.style("opacity", 0)
            });


var groups = d3.select("#figure1")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .selectAll("rect")
            .data(stats);
   
  var groupsEnter = groups.enter();
  

  groupsEnter.append("rect")
            .attr("class", "cpi")
            .attr("width", xScale.bandwidth() / 3 - 1)
            .attr("height", function (d) { return height / 2 - yScale(d.cpi) })
            .attr("x", function (d) { return xScale(d.year); })
            .attr("y", function (d) { return height - (height - yScale(d.cpi)); })
            .on("mouseenter", function(d) {
                tooltip.style("opacity", 1)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .html(`Inflation<br\>${d.cpi}%`)
            });
        groupsEnter.append("rect")
            .attr("class", "cpb")
            .attr("width", xScale.bandwidth() / 3 - 1)
            .attr("height", function (d) { return height / 2 - yScale(d.cpb) })
            .attr("x", function (d) { return xScale(d.year) + xScale.bandwidth() / 3; })
            .attr("y", function (d) { return height - (height - yScale(d.cpb)); })
            .on("mouseenter", function(d) {
                tooltip.style("opacity", 1)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .html(`Savings<br\>${d.cpb}%`)
            });
       groupsEnter.append("rect")
            .attr("class", "tse")
            .attr("width", xScale.bandwidth() / 3 - 1)
            .attr("height", function (d) {
                if (d.tse < 0)
                    return yScale(d.tse) - height / 2;
                else
                    return height / 2 - yScale(d.tse);
            })
            .attr("x", function (d) { return xScale(d.year) + (xScale.bandwidth() / 3 * 2); })
            .attr("y", function (d) {
                if (d.tse < 0)
                    return height / 2;
                else
                    return height - (height - yScale(d.tse));
            })
            .on("mouseenter", function(d) {
                tooltip.style("opacity", 1)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .html(`Investment<br\>${d.tse}%`)
            });

        d3.select("#figure1").append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(d3.axisLeft(yScale));
        d3.select("#figure1").append("g")
            .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
            .call(d3.axisBottom(xScale));
        var g = d3.select("#figure1").append("g")
            .attr("transform", "translate(" + margin.left + "," + (height + margin.top + 50) + ")");
            g.append("rect")
            .attr("x", "30")
            .attr("y", "0")
            .attr("height", "20")
            .attr("width", "20")
            .attr("class", "cpi");
            g.append("text")
            .attr("x","55")
            .attr("y", "15")
            .attr("fill","black")
            .text("CPI (Inflation)");
            g.append("rect")
            .attr("x", "240")
            .attr("y", "0")
            .attr("height", "20")
            .attr("width", "20")
            .attr("class", "cpb");
            g.append("text")
            .attr("x","265")
            .attr("y", "15")
            .attr("fill","black")
            .text("CPB (Savings Rate)");
            g.append("rect")
            .attr("x", "490")
            .attr("y", "0")
            .attr("height", "20")
            .attr("width", "20")
            .attr("class", "tse");
            g.append("text")
            .attr("x","515")
            .attr("y", "15")
            .attr("fill","black")
            .text("TSE (Investment Return)");
            






}


function switchTo(scene) {
    // hide all scenes and then show the requested scene
    document.getElementById("figure1div").classList.add("deactive");
    document.getElementById("figure1div").classList.remove("active");
    document.getElementById("figure2div").classList.add("deactive");
    document.getElementById("figure2div").classList.remove("active");
    document.getElementById("figure3div").classList.add("deactive");
    document.getElementById("figure3div").classList.remove("active");
    document.getElementById("figure4div").classList.add("deactive");
    document.getElementById("figure4div").classList.remove("active");

    document.getElementById(scene).classList.add("active");
    document.getElementById(scene).classList.remove("deactive");

}

function loadAll() {
    figure1.load();
 }
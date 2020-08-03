var figure5 = {};
figure5.load = function() {
    // Load data.
    d3.csv('/data/funds.csv', figure5.type).then(res => {
        figure5.ready(res);
    });
}

figure5.type = function (d) {    
    let data = {};
    data.axis = document.getElementById('AXIS').value;
    data.fund = d.FUND;
    switch(data.axis) {
        case 'YIELD':
            data.value = +d.Yield;  
            data.color = 'red';
            break;
        case 'MER':
            data.value = +d.MER;
            data.color = 'orange';
            break;
        case 'AUM':
            data.value = +d.AUM;
            data.color = 'yellow';
            break;
        case 'STARS':
            data.value = +d.Stars;
            data.color = 'green';
            break;
        case 'ALPHA':
            data.value = +d.Alpha;
            data.color = 'blue';
            break;
        case 'SHARPE':
            data.value = +d.Sharpe;
            data.color = 'indigo';
            break;
    }
    return data;
}

figure5.ready = function(stats) {
    // Dimensions.
    const margin = { top: 20, right: 60, bottom: 40, left: 60 };
    const width = 1000 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;      
    var min=0;
    var max=0;
    const axis = document.getElementById('AXIS').value;   
    var message ='';
    switch(axis) {
        case 'YIELD':
            message = 'Fund Yield Comparison';
            break;
        case 'MER':
            message = 'Fund Management Expense Ratio (MER)';
            break;
        case 'AUM':
            message = 'Fund Assets Under Management (in CDN$ Billions)';
            break;
        case 'STARS':
            message = 'Fund Morningstar Rating';
            break;
        case 'ALPHA':
            message = 'Fund Alpha (Active Management Comparison)';
            break;
        case 'SHARPE':
            message = 'Fund Sharpe Ration (Return compared to Risk)';
            break;
    }

    d3.select("#figuretitle")
        .html(message);
     
    
    
    for(var i=0; i<stats.length; i++) {
        if(stats[i].value < min) min = stats[i].value;
        if(stats[i].value > max) max = stats[i].value;
    }
    min = Math.round( min - 0.5);
    max = Math.round( max + 0.5);
var xScale = d3
                .scaleBand()
                .domain(stats.map(d => d.fund))
                .rangeRound([0, width])
                .paddingInner(0.15);
 
    var yScale = d3
                .scaleLinear()
                //.domain([0,d3.max(stats.map(d=> d.value))])
                .domain([min, max])
                .range([height, 0]);
    
    d3.selectAll("#figure5").remove();
    var groups = d3.select("#figure5div")
        .append('svg')
        .attr('id', 'figure5')   
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll("rect")
        .data(stats);

    var groupsEnter = groups.enter();
    groupsEnter.append("rect")
    .attr("x", function (d) { return xScale(d.fund) + 1; })   
    .attr("width", xScale.bandwidth())
    .attr("y", height)
    .attr("height", 0)
    .attr("fill", function(d) {return d.color;})
    .transition()
    .duration(1500)
    .delay(function(d,i){ return i*250})
    .attr("height", function (d) { return height - yScale(d.value) })
    .attr("y", function (d) { return height - (height - yScale(d.value)); });
    d3.select("#figure5").append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(yScale));
    d3.select("#figure5").append("g")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
        .call(d3.axisBottom(xScale));
}




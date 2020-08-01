var figure2 = {};

figure2.popUpMessage1 = ("You don't have to choose either investment<br> in the market or savings.  Use the options <br>in the blue box to see the performance of a blend<br> of investment and savings over time.")
figure2.load = function() {
  // Load data.
  d3.csv('investsave.csv', figure2.type).then(res => {
    figure2.ready(res, 100000, 1999, 0);
  });
}

figure2.type = function(d) {
  return {
    year: +d.Year,    
    invest: +d.Invest,
    savings: +d.Savings,
    tse: +d.TSE,
    cpb: +d.CPB
  };
}



figure2.prepareData = function(data, startAmount, startYear, blendPerc) {
   
    let invest = [];
    let savings = [];
    let blend = [];
    let dates = [];
    let invTotal = startAmount;
    let savTotal = startAmount;
    let blendTotal = startAmount;
    let yMax = 0;
    let invPart = 0;
    let savPart = 0;
    for(let i = startYear; i< 2020; i++ )
    {
        invest.push({date: d3.timeParse('%Y')(i), value: invTotal});
        savings.push({date: d3.timeParse('%Y')(i), value: savTotal});
        blend.push({date: d3.timeParse('%Y')(i), value: blendTotal});
        dates.push(d3.timeParse('%Y')(i));
        invTotal = invTotal * ( 1 + data[i - 1999].tse / 100);
        if (invTotal > yMax) yMax = invTotal;
        savTotal = savTotal * ( 1 + data[i - 1999].cpb / 100);
        if (savTotal > yMax) yMax = savTotal;
        invPart =   data[i - 1999].tse / 100 * blendPerc  / 100;
        savPart =  data[i - 1999].cpb / 100 * (100 - blendPerc) / 100; 
        blendTotal = blendTotal * ( 1 +invPart + savPart);
        if (blendTotal > yMax) yMax = blendTotal;
    }
    let lineData = {};
    if(blendPerc > 0)  {
      lineData = {
          series: [
              {
                name: 'Invest',
                color: 'dodgerblue',
                values: invest
              },
              {
                name: 'Savings',
                color: 'darkorange',
                values: savings
              },
              {
                  name: 'Blend',
                  color: 'green',
                  values: blend
              }
        
            ],
            dates: dates,
            yMax: yMax
      };
  }
  else {
    lineData = {
      series: [
          {
            name: 'Invest',
            color: 'dodgerblue',
            values: invest
          },
          {
            name: 'Savings',
            color: 'darkorange',
            values: savings
          }
        ],
        dates: dates,
        yMax: yMax
    };
  }   

    return lineData;
}


// Drawing utilities.
figure2.formatTicks = function(d) {
  return d3
    .format('~s')(d)
    .replace('M', ' mil')
    .replace('G', ' bil')
    .replace('T', ' tril');
}

// Main function.
figure2.ready = function(stats, startAmount, startYear, blend) {
  
  const lineChartData = figure2.prepareData(stats, startAmount, startYear, blend);


  // Dimensions.
  const margin = { top: 40, right: 60, bottom: 40, left: 60 };
  const width = 700 - margin.right - margin.left;
  const height = 400 - margin.top - margin.bottom;

  // Scale data.
  const xScale = d3
    .scaleTime()
    .domain(d3.extent(lineChartData.dates))
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, lineChartData.yMax])
    .range([height, 0]);

  figure2.popup1 = d3
    .select("#popup2-1")  
    .style("left", (width - 230) + "px")
    .style("top", (height * 2 - 350) + "px")
    .html(figure2.popUpMessage1);

    d3.select("#figure2div")                       
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);


   
  // Line generator.
  const lineGen = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value));

  // Draw base.
  d3.selectAll(".line-chart-container svg").remove();
  
  d3.select(".line-chart-container")
    .on("mouseenter", function () {
      figure2.popup1.style("opacity", 1)
    })
    .on("mouseleave", function() { 
      figure2.popup1.style("opacity", 0)
    });

  const svg = d3
    .select('.line-chart-container')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
    


  // Draw x axis.
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

  const xAxisDraw = svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .attr('class', 'x axis')
    .call(xAxis);

  // Draw y axis.
  const yAxis = d3
    .axisLeft(yScale)
    .ticks(6)
    .tickFormat(figure2.formatTicks)
    .tickSizeOuter(0)
    .tickSizeInner(-width);

  const yAxisDraw = svg
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  // Group chart elements.
  const chartGroup = svg.append('g').attr('class', 'line-chart');

  // Draw lines.
  chartGroup
    .selectAll('.line-series')
    .data(lineChartData.series)
    .enter()
    .append('path')
    .attr('class', d => `line-series ${d.name.toLowerCase()}`)
    .attr('d', d =>  lineGen(d.values))
    .style('fill', 'none')
    .style('stroke', d => d.color);
  
  chartGroup
    .append('g')
    .attr('class', 'series-labels')
    .selectAll('.series-label')
    .data(lineChartData.series)
    .enter()
    .append('text')
    .attr('x', d => xScale(d.values[d.values.length - 1].date) + 5)
    .attr('y', d => yScale(d.values[d.values.length - 1].value))
    .text(d => d.name)
    .style('dominant-baseline', 'central')
    .style('font-size', '0.7em')
    .style('font-weight', 'bold')
    .style('fill', d => d.color);
}

figure2.buttonClick = function() {
    let year = document.getElementById('YEAR').value;
    let startAmount = document.getElementById('START').value;
    let blend = document.getElementById('BLEND').value;
 
    d3.csv('investsave.csv', figure2.type).then(res => {
        figure2.ready(res, +startAmount, +year, +blend);
      });
      
}

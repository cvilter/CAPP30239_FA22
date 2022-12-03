/* 
D3 Line Chart: Pre-Treatment Data (FEV1 over time)
Adapted from Tiffany France CAPP30239_FA22 class code
*/

d3.csv('data/clean/line_pre_tre.csv').then(data => {

    const height = 500,
      width = 400,
      margin = ({top: 15, right: 30, bottom: 45, left: 55});
      
    const svg = d3.select("#line_pre_tre")
      .append("svg")
      .attr("viewBox", [0, 0, width, height]);
  
    let timeParse = d3.timeParse("%Y-%m-%d")
  
    for (let d of data) {
        d.fev1_over_pred_100 = +d.fev1_over_pred_100; //force numeric
        d.date = timeParse(d.date)
    }
  
    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right])
  
    let y = d3.scaleLinear()
        .domain([69, 110])
        .range([height - margin.bottom, margin.top])
    
    // position & format y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => (d) + "%").tickSize(-width));
  
    // position & format x axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x)
        .ticks(4)
        .tickSizeOuter(0)
        .tickFormat(d3
        .timeFormat("%b %d"))); // abbreviated month names
  
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Date");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 11)
      .attr("transform", "rotate(-90)")
      .text("FEV1");
  
    let line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.fev1_over_pred_100)) //finds positions for the datapoints based on our given data, domain, range
  
    svg.append("path")
        .datum(data)
        .attr("d", line) //svg uses "d" attribute element to build out paths
        .attr("fill", "none")
        .attr("stroke", "blue");
  
  });
  
  
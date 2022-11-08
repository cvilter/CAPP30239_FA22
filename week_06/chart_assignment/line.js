/* D3 Line Chart */

const height = 500,
    width = 800,
    margin = ({top: 15, right: 30, bottom: 45, left: 55});
    
const svg = d3.select("#chart_time")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('data/mi_monthly.csv').then(data => {

    console.log(data)

    let timeParse = d3.timeParse("%Y-%m")

    for (let d of data) {
        d.prop_mental_illness = +d.prop_mental_illness; //force numeric
        d.month = timeParse(d.month)
    }

    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.month))
        .range([margin.left, width - margin.right])

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.prop_mental_illness)])
        .range([height - margin.bottom, margin.top])
    
    // position & format y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis")
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width));

    // position & format x axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x)
        .tickSizeOuter(0)
        .tickFormat(d3
        .timeFormat("%b"))); // abbreviated month names

    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month");
    
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 11)
      .attr("transform", "rotate(-90)")
      .text("% cases reporting mental illness");

    let line = d3.line()
      .x(d => x(d.month))
      .y(d => y(d.prop_mental_illness)) //finds positions for the datapoints based on our given data, domain, range
      //.curve(d3.curveNatural) //interpolate the data

    svg.append("path")
        .datum(data)
        .attr("d", line) //svg uses "d" attribute element to build out paths
        .attr("fill", "none")
        .attr("stroke", "green");

  });


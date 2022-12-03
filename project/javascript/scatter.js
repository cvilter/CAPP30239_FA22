/* 
D3 Scatterplot: FEV1 vs PEF
Adapted from Tiffany France CAPP30239_FA22 class code
*/

d3.csv('data/clean/scatter_data.csv').then(data => {

  let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 40, left: 55});

  const svg = d3.select("#scatter")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  for (let d of data) {
    d.fev1_over_pred_100 = +d.fev1_over_pred_100;
    d.pef_over_pred_100 = +d.pef_over_pred_100;
  }

  let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.pef_over_pred_100)).nice()
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.fev1_over_pred_100)).nice()
    .range([height - margin.bottom, margin.top]);

  // position & format y axis
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => (d) + "%").tickSize(-width));

  // position & format x axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(d => (d) + "%"))

  // datapoints
  svg.append("g")
    .attr("fill", "blue")
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => x(d.pef_over_pred_100))
    .attr("cy", d => y(d.fev1_over_pred_100))
    .attr("r", 2)
    .attr("opacity", 0.75);

  // labels
  svg.append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", width - margin.right)
    .attr("y", height)
    .attr("dx", "0.5em")
    .attr("dy", "-0.5em") 
    .text("PEF");
    
  svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("x", -margin.top/2)
    .attr("dx", "-0.5em")
    .attr("y", 11)
    .attr("transform", "rotate(-90)")
    .text("FEV1");
    
});
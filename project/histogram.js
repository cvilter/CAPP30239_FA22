/* D3 Histogram */


d3.json('data/clean/hist_before.json').then((data) => {

  const height = 180,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;

  const svg = d3.select("#hist_before")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

  for (let d of data) {
    d.pef_over_pred_100 = +d.pef_over_pred_100;
  }
  
  const x = d3.scaleLinear()
    .domain([80,135])
    .range([margin.left, width - margin.right]);
  
  const y = d3.scaleLinear()
    .domain([0,50])
    .range([height - margin.bottom, margin.top]);
    
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom + 5})`)
    .call(d3.axisBottom(x));

  const binGroups = svg.append("g")
    .attr("class", "bin-group");

  const bins = d3.bin()
    .thresholds(10)
    .value(d => d.pef_over_pred_100)(data);

  console.log(bins)

  let g = binGroups.selectAll("g")
    .data(bins)
    .join("g");

  g.append("rect")
    .attr("x", d => x(d.x0) + (padding / 2))
    .attr("width", d => x(d.x1) - x(d.x0) - padding)
    .attr("y", height - margin.bottom)
    .attr("height", 0)
    .attr("fill", "blue")
    .transition()
    .duration(750)
    .attr("y", d => y(d.length))
    .attr("height", d => height - margin.bottom - y(d.length));

  g.append("text")
    .text(d => d.length)
    .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
    .attr("y", d => y(d.length) - 5)
    .attr("text-anchor", "middle")
    .attr("fill", "#333");

});
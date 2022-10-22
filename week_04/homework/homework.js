// Line Chart Exercise
// Canadian Interest Rate
// Carolyn Vilter
// 22.10.23

// establish constants for svg, range, axes
const height = 500,
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });
    
// linked to "chart" ID in homework.html
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

// reference data
d3.csv('long-term-interest-canada.csv').then(data => {

    // set up & use function to format Num as d3-readable date
    let timeParse = d3.timeParse("%Y-%m")
    for (let d of data) {
        d.Month = timeParse(d.Month)
    }

    // establish x, y scales
    let x = d3.scaleTime()
        .domain(d3.extent(data, d => d.Month)) // returns array
        .range([margin.left, width - margin.right])
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Num)]).nice() // "nice" extended y labels above data max
        .range([height - margin.bottom, margin.top])
    
    // position & format y axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .attr("class", "y-axis") // specific class allows us to format x and y axes differently
      .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width));

    // position & format x axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x)
        .tickSizeOuter(0)
        .tickFormat(d3
        .timeFormat("%b"))); // abbreviated month names

    // x-axis labels
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Month");
    
    // y-axis labels
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 10)
      .attr("transform", "rotate(-90)")
      .text("Interest rate");

    // now to plot the actual line
    let line = d3.line()
      .x(d => x(d.Month))
      .y(d => y(d.Num))
    svg.append("path")
        .datum(data)
        .attr("d", line)
        .attr("fill", "none") // bc not making an area chart
        .attr("stroke", "dodgerblue"); // homework.html sets transparent, dashed stroke

  });


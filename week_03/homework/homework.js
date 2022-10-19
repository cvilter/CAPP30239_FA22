// Library Visit Bar Chart Exercise
// Carolyn Vilter
// 22.10.17

// data: jan 2022 library visit csv
d3.csv("library_visits_jan22.csv").then(data => { 

    // loop through data; force "num" var to be numeric
    for (let d of data) {
        d.num = +d.num
    };

    // sort data by highest to lowest "num" value
    data.sort((a, b) => d3.descending(a.num, b.num))

    // establish constaints for svg, range (below)
    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 })

    // set up svg - references the "chart" ID in homework.html
    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
    
    // establish domain (data values), range (space i.e. pixels)
    let x = d3.scaleBand()
        .domain(data.map(d => d.branch))
        .range([margin.left, width - margin.right])
        .padding(0.1);
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice()
        .range([height - margin.bottom, margin.top])

    // x axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x))

    // y axis
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y))

    // create bar groups; join data
    let bar = svg.selectAll(".bar")
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar")

    // append rectangles; establish position, size, color; and loop through "num" data
    bar.append("rect")
        .attr("fill", "darkblue")
        .attr("x", d => x(d.branch))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.num))
        .attr("height", d => y(0) - y(d.num))
    
    // add value labels on top center of each bar
    bar.append('text')
        .text(d => d.num)
        .attr('x', d => x(d.branch) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')

    // add title to top of chart
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 + (margin.top))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .text("January 2022 Library Visits by Branch")
    
})
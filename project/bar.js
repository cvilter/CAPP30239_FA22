/* D3 Bar Chart */

d3.csv("data/clean/bar_data.csv").then(data => { 

    // loop through data; force "num" var to be numeric
    for (let d of data) {
        d.count_notes = +d.count_notes
    };

    // sort data by highest to lowest "num" value
    // data.sort((a, b) => d3.descending(a.count_notes, b.count_notes))

    // establish constaints for svg, range (below)
    const height = 600,
          width = 800,
          margin = ({ top: 25, right: 30, bottom: 35, left: 50 })

    // set up svg - references the "chart" ID in homework.html
    let svg = d3.select("#bar")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
    
    // let timeParse = d3.timeParse("%Y-%m-%d")

    // for (let d of data) {
    //     d.fev1_over_pred_100 = +d.fev1_over_pred_100; //force numeric
    //     d.week = timeParse(d.week)
    // }

    // establish domain (data values), range (space i.e. pixels)
    let x = d3.scaleBand()
        .domain(data.map(d => d.week_num))
        .range([margin.left, width - margin.right])
        .padding(0.1);
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count_notes)]).nice()
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
        .attr("fill", "blue")
        .attr("x", d => x(d.week_num))
        .attr("width", x.bandwidth())
        .attr("y", d => y(d.count_notes))
        .attr("height", d => y(0) - y(d.count_notes))
    
    // add value labels on top center of each bar
    bar.append('text')
        .text(d => d.count_notes)
        .attr('x', d => x(d.week_num) + (x.bandwidth()/2))
        .attr('y', d => y(d.count_notes) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')

    // axis labels
    svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "end")
      .attr("x", width - margin.right)
      .attr("y", height + 6)
      .attr("dx", "0.5em")
      .attr("dy", "-0.5em") 
      .text("Week");
    svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "end")
      .attr("x", -margin.top/2)
      .attr("dx", "-0.5em")
      .attr("y", 11)
      .attr("transform", "rotate(-90)")
      .text("Number of qualitative notes");

})
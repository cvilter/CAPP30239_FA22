/* Bar chart for COVID cuontry cases */

// pointing to our script and "then" a "promise"
d3.csv("covid.csv").then(data => {
    for (let d of data) {
        // plus sign forces it to be a number
        d.cases = +d.cases;
    };

    // creating constants
    const height = 600,
        width = 800,
        margin = ({top: 25, right: 30, bottom: 35, left: 50});

    let svg = d3.select("#chart") //hash chart means id chart, we created that id in index.html
        .append("svg")
        .attr("viewBox", [0, 0, width, height]) //"start at 0 0 and grow by these amounts"

    // scales are a big deal
        // domain is min to max values in data, e.g. 0, 1000
        // range is the space we want it to take up
    // by declaring this as x we can refer to it later
    let x = d3.scaleBand()
        // this is saying "get each country and put it into the domain"
        // domain is a chain function only used in scaleBand
        .domain(data.map(d => d.country)) //"that's a javascript map which maps the data 1:1", puts the countries in an array
        // ^ looping through each row of country 
        .range([margin.left, width - margin.right])
        .padding(0.1); //how far apart bars are on the chart
    
    // scale linear bc the axis is numeric
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases)]).nice() //d3.max is a convenience function, finds highest value of cases
        // this ^ says "function d return d.cases"
        .range([height - margin.bottom, margin.top]); //svgs are built from top down

    // now that we have our scale we can build our axes
    const xAxis = g => g // taking in g and then assigning it, making it part of the xAxis function
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        //automatically runs the function when, later, we ask it to run xAxis
        .call(d3.axisBottom(x)); // x is the scale we built
    
    const yAxis = g => g // this is using the group... so it's ok to use g again...
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y)); 

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    let bar = svg.selectAll(".bar")
        // we've selected all the elements with the class bar and now we're actually going to add them
        .append("g") // appending the group
        .data(data) // this and next lines are a data join
        .join("g") // telling it to use the group g
        .attr("class", "bar") // giving it the class bar
    
    bar.append("rect") // inside this group we just created append a rectangle
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country)) // exposition
        .attr("width", x.bandwidth()) // give it a width of x.bandwidth() which is particular to the x scaleBand we're using
                                        // gives us the size of our bars based on how many there are
        .attr("y", d => y(d.cases)) // "d is the loop, we're looping through, d.cases is the number of cases on the y scale"
        .attr("height", d => y(0) - y(d.cases));

});


data_list = ['data/mod_mi_no_ring.json', 'data/mod_mi_yes_ring.json']

for (let dataset of data_list) {

    d3.json(dataset).then((data) => {

        const height = 420,
          width = 500,
          innerRadius = 90,
          outerRadius = 160,
          labelRadius = 185

      
        const arcs = d3.pie().value(d => d.count)(data);
        const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
      
        const svg = d3.select("#chart_mod")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
      
        svg.append("g")
          // makes white separators between arcs
          .attr("stroke", "white")
          .attr("stroke-width", 2)
          .attr("stroke-linejoin", "round")
          // data stuff
          .selectAll("path")
          .data(arcs)
          .join("path")
          // use this scheme category 10 and move through the colors
          // it'll just loop if it exceeds 10 categories / colors
          .attr("fill", (d, i) => d3.schemeSet1[i])
          .attr("d", arc);
      
        svg.append("g")
          .attr("font-size", 10)
          .attr("text-anchor", "middle")
          .selectAll("text")
          .data(arcs)
          .join("text")
          // centroid has to do with aligning with center point of arc
          .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
          .selectAll("tspan")
          .data(d => {
            return [d.data.Manner_of_death, d.data.count];
          })
          .join("tspan")
          .attr("x", 0)
          .attr("y", (d, i) => `${i * 1.1}em`)
          .attr("font-weight", (d, i) => i ? null : "bold")
          .text(d => d);
      
        // Label for the first dataset
        if (dataset == 'data/mod_mi_no_ring.json') {
            svg.append("text")
            .attr("font-size", 30)
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text("No mental illness")
            .style("font-size", 16);
        }

        // Label for the second dataset
        if (dataset == 'data/mod_mi_yes_ring.json') {
            svg.append("text")
            .attr("font-size", 30)
            .attr("font-weight", "bold")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .text("Mental illness")
            .style("font-size", 16);
        }

      });

}

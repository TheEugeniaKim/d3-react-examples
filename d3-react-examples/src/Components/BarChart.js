import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import { select, scaleBand, scaleLinear, axisBottom, axisRight } from "d3";

function BarChart() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    // scales
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    // create y-axis
    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    // draw the bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (value, index, something ) => {
        console.log(value, index, something)
        svg
          .selectAll(".tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", value => 150 - yScale(value));
  }, [data]);




  //   const svg = select(svgRef.current);
  //   const xScale = scaleBand()
  //     .domain(data.map((value, index) => index))
  //     .range([0, 300])
  //     .padding(0.5);

  //   const yScale = scaleLinear().domain([0, 150]).range([150, 0]); // 150 pixels is the size of the svg

  //   const colorScale = scaleLinear()
  //     .domain([75, 100, 150])
  //     .range(["green", "orange", "red"])
  //     .clamp(true);

  //   const xAxis = axisBottom(xScale)
  //     .ticks(data.length)
  //     .tickFormat((index) => index + 1);
  //   svg.select(".x-axis").style("transform", "translateY(150px)").call(xAxis);

  //   const yAxis = axisRight(yScale);
  //   svg.select(".y-axis").style("transform", "translateX(300px)").call(yAxis);

  //   svg
  //     .selectAll(".bar")
  //     .data(data)
  //     .join("rect")
  //     .attr("class", "bar")
  //     .style("transform", "scale(1, -1)")
  //     .attr("x", (value, dataIndex) => xScale(dataIndex))
  //     .attr("y", -150)
  //     .attr("width", xScale.bandwidth())
  //     .on("mouseenter", (value, index) => {
  //       console.log( index, value )
  //       console.log( xScale(index))
  //       svg
  //         .selectAll(".d3tooltip")
  //         .data([index])
  //         .join("text")
  //         .attr("class", "d3tooltip") 
  //         .text(index)
  //         .attr("x", xScale(data.index))
  //         .attr("y", yScale(value) - 8)
  //         .transition()
  //         .attr("opacity", 1)
  //     })
  //     .on("mouseleave", () => 
  //       svg.select(".d3tooltip"). remove()
  //     )
  //     .transition()
  //     .attr("fill", colorScale)
  //     .attr("height", (value) => 150 - yScale(value))
  // }, [data]);

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter Data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add Data
      </button>
    </React.Fragment>
  );
}

export default BarChart;

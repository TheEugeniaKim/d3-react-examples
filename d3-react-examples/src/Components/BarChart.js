import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import { select, scaleBand, scaleLinear, axisBottom, axisRight } from "d3";
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null)
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });

    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref])
  return dimensions 
}

function BarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef)

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    console.log(dimensions)

    if (!dimensions) return;

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([dimensions.height, 0]); // 150 pixels is the size of the svg

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["green", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    svg.select(".x-axis").style("transform", `translateY(${dimensions.height}px)`).call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", `translateX(${dimensions.width}px)`).call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, dataIndex) => xScale(dataIndex))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", (event, value) => {
        svg
          .selectAll(".d3tooltip")
          .data([value])
          .join(enter => enter.append("text").attr("y", yScale(value) - 4))
          .join("text")
          .attr("class", "d3tooltip") 
          .text(value)
          .attr("x", xScale(data.indexOf(value)) + xScale.bandwidth() / 2)
          .attr("y", yScale(value) - 8)
          .attr("text-anchor", "middle")
          .transition()
          .attr("opacity", 1)
      })
      .on("mouseleave", () => 
        svg.select(".d3tooltip").remove()
      )
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => dimensions.height - yScale(value))
    
    }, [data, dimensions]);

  return (
  <div className="wrapper" ref={wrapperRef} style={{marginBottom: "2rem"}}>
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  </div>
);
}

export default BarChart;

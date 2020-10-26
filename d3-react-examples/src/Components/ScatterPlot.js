import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import { select, scaleBand, scaleLinear, axisBottom, axisRight, selection, color } from "d3";
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


function ScatterPlot(data){
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    console.log(data)
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const colorScale = scaleLinear()
      .domain([0, 30])
      .range(["black", "purple"])
      .clamp(true);

    const xScale = scaleBand()
      .domain(data.data.map((value, index) => index))
      .range([0, dimensions.width])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([dimensions.height, 0]); // 150 pixels is the size of the svg
    
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    svg.select(".x-axis").style("transform", `translateY(${dimensions.height}px)`).call(xAxis).style("stroke", "red");

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", `translateX(${dimensions.width}px)`).call(yAxis);

    svg.selectAll(".circle")
      .data(data.data)
      .join("circle")
      .attr("class", "circle")
      .style("transform", "scale(1, -1)")
      .attr("r", 8)
      .attr("cx", (obj, dataIndex) => xScale(dataIndex))
      .attr("cy", (obj,dataIndex)=> -yScale(obj.value))
      .attr("width", xScale.bandwidth())
      .attr("fill", (obj,dataIndex) => colorScale(obj.value))
      .append("title")
        .text(obj => `hello ${obj.name}`)
      // .on("mouseenter", function(event, d) {
      //   const e = svg.nodes()
      //   const i = e.indexOf(this)
      //   console.log(e, i, d)
      //   svg.append("title")
      //     .text(d => 

      //       // console.log(obj)
      //       `hello ${d.name}`
      //       // `name: ${obj["name"]}`
      //     )
      // })
      .on("mouseleave", () => 
        svg.select(".d3tooltip").remove()
      )
      .transition()
      .attr("fill", colorScale())
      .attr("height", (value) => dimensions.height - yScale(value))
  }, [data,dimensions])

  return (
    <div className="wrapper" ref={wrapperRef} style={{marginBottom: "2rem"}}>
    <svg ref={svgRef}>
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  </div>
  )
}

export default ScatterPlot
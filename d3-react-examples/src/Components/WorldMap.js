import React, { useRef, useEffect, useState } from 'react'
import '../App.css'
import { select, geoPath, geoMercator, min, max, scaleLinear, zoom } from 'd3'
import useResizeObserver from './useResizeObserver'

function WorldMap({data, property}){
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const svg = select(svgRef.current);
    const g = svg.append("g")
    const minProp = min(data.features, feature => feature.properties[property]);
    const maxProp = max(data.features, feature => feature.properties[property]);
    console.warn(minProp, maxProp)
    const colorScale = scaleLinear().domain([minProp, maxProp]).range(["#ccc", "red"]);

    const {width, height} = dimensions || wrapperRef.current.getBoundingClientRect() ;
    const projection = geoMercator().fitSize([width,height], selectedCountry || data);
    
    //takes geojson data and transforms that into the d attribute of path element
    const pathGenerator = geoPath().projection(projection);

    g
      .selectAll(".country")
      .data(data.features)
      .join("path")
      // .on("click", event => {
        // console.log(event.path)
        // setSelectedCountry(selectedCountry === feature ? null : feature);
      // })
      .attr("class", "country")
      .attr("fill", feature => colorScale(feature.properties[property]))
      .attr("d", feature => pathGenerator(feature))
      .append("title")
        .text(feature => feature.properties.name)
      .append("title")
        .text(feature => feature.properties.women)

    svg.call(zoom().on("zoom", (event) => {
      g.attr('transform', event.transform)
    }))

  }, [data, dimensions, property, selectedCountry])

  return(
    <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
      <svg className="world-map"ref={svgRef}></svg>
    </div>
  )
}

export default WorldMap
import React, { useRef, useEffect, useState } from 'react'
import '../App.css'
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3'
import data from './GeoChart.geo.json'
// import useResizeObserver from './useResizeObserver'

function WorldMap({data, property}){
  const svgRef = useRef()
  const wrapperRef = useRef()
  // const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = select(svgRef.current)
    
    // const {width, height} = dimensions || wrapperRef.current.getBoundingClientRect() 
    
    const projection = geoMercator()
    
    //takes geojson data and transforms that into the d attribute of path element
    const pathGenerator = geoPath().projection()

    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .attr("class", "country")
      .attr("d", feature => pathGenerator(feature))


  // }, [data, dimensions, property])
  },)
  return(
    <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default WorldMap
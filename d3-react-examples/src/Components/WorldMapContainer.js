import React, { useRef, useEffect, useState } from 'react'
import '../App.css'
import { select, line, curveCardinal, scaleLinear, axisBottom, axisRight } from 'd3'
// import data from './GeoChart.geo.json'
import data from './GeoChartHumaniki.geo.json'
import WorldMap from './WorldMap'

// Geo JSON file properties to import for 

function WorldMapContainer(){
  const [property, setProperty] = useState("pop_est")
  return (
    <React.Fragment>
      <h2>World Map with d3-geo data</h2>
      <WorldMap data={data} property={property} />
      <h2>Select Property to highlight</h2>
      <select 
        value={property}
        onChange={event => setProperty(event.target.value)}
      >
        <option value="pop_est">Population</option>
        <option value="name_len">Name Length</option>
        <option value="gdp_md_est">GDP</option>
        <option value="women">Women</option>
      </select>
    </React.Fragment>
  )
}

export default WorldMapContainer; 
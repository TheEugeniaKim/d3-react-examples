import React from 'react';
import './App.css';
import LineChart from './Components/LineChart'
import BarChart from './Components/BarChart'
import WorldMapContainer from './Components/WorldMapConner'

function App() {
  return (
    <div className="container">
      
      {/* <LineChart /> */}

      <BarChart />

      {/* <WorldMapContainer /> */}

    </div>
  )
}

export default App;

// svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("r", value => value)
    //   .attr("cx", value => value = 2)
    //   .attr("cy", value => value = 2)
    //   .attr("stroke", "red")

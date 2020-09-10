import React, { useState } from 'react';
import './App.css';
import LineChart from './Components/LineChart'
import BarChart from './Components/BarChart'
import WorldMapContainer from './Components/WorldMapContainer'

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 10, 65, 75]);

  return (

    <React.Fragment>
      
      {/* <LineChart /> */}

      <BarChart data={data} />

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

      {/* <WorldMapContainer /> */}

    </React.Fragment>
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

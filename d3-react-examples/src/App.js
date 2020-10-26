import React, { useState } from 'react';
import './App.css';
import LineChart from './Components/LineChart'
import BarChart from './Components/BarChart'
import WorldMapContainer from './Components/WorldMapContainer'
import RadialBarChart from './Components/RadialBarChart';
import ScatterPlot from './Components/ScatterPlot'
function App() {
  const [data, setData] = useState([25, 75, 30, 45, 60, 10, 65, 75]);
  const [scatterData, setScatterData] = useState([{id: 1, value:24, name: "datapoint 1"},{id:2, value:15, name: "datapoint 2"},{id:3, value:22, name: "datapoint 3"},{id: 4, value:20, name: "datapoint 4"}])
  return (

    <React.Fragment>
      
      <LineChart />

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

      <ScatterPlot data={scatterData} />

      {/* <WorldMapContainer /> */}

      {/* <RadialBarChart 
        width={200} 
        height={200} 
        outerRadius={100} 
        innerRadius={50}
        data={[{label:"men", value: 69},{label: "non-binary", value:1},{label: "women", value:30}]}
      /> */}
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

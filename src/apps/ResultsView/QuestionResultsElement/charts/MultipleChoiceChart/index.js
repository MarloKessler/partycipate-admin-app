import "../style.css"
import { Bar } from 'react-chartjs-2'
import { useEffect, useRef } from "react"
import Server from "../Server"

export default MultipleChoiceChart

function MultipleChoiceChart({ element }) {
    
    const chartRef = useRef()
    
     useEffect(() => {
             new Chart(chartRef.current, {
                 type: 'bar',
                 labels: element.content.answers,
                 datasets: [{
                 label: '# of Votes',
                 data: element.content.results,
             }],
             options: {}
             })
         }, [])
        
         return (
             <canvas ref={chartRef}></canvas>
         )
    }



/*function MultipleChoiceChart({ element }) {
    const BarChart = (props) => {
        const margin = { right: 25 };
        const xScale = d3.scaleLinear()
         .domain([0, 100])
         .range([0, 1100 - margin.right]);
    return (
        <>
            <div id="axis"><XAxis xScale={xScale} /></div>
            <div id="bar-chart">
            <Neighborhoods {...props} xScale={xScale} />    
            </div>
        </>
        
    )
}}*/




/*import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
import "./styles.css";

export default function App() {
  useLagRadar();

  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "ordinal"
  });
  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "left" },
      { position: "bottom", type: "linear", stacked: true }
    ],
    []
  );
  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart data={data} series={series} axes={axes} tooltip />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
*/

//https://codesandbox.io/s/github/tannerlinsley/react-charts/tree/next/examples/bar?file=/src/index.js:0-987
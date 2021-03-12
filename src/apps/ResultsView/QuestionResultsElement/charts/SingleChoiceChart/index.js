import "./style.css"
import Chart from "chart.js"
import { useEffect, useRef} from "react"


export default SingleChoiceChart

function SingleChoiceChart({ element }) {

    const chartRef = useRef()

     useEffect(() => {

         new Chart(chartRef.current, {
            type: 'doughnut',
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
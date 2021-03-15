import "./style.css"
import { Bar } from 'react-chartjs-2'

export default BarChart

function BarChart({ element }) {
    const content = element.content
    
    const data = {
        labels: content.answers,
        datasets: [
            {
                label: content.question,
                data: content.results,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: "transparent",
            },
        ],
    }

    const options = {
        legend: {
            display: false
        },
        /*scales: {
            xAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        callback: label => formatLabel(label)
                    },
                    gridLines: {
                        display: true,
                    },
                }
            ],
            yAxes: [
                {
                    ticks: {
                        // Uncomment the following line to show results with 
                        //max: 1,
                        stepSize: .2,
                        beginAtZero: true,
                        callback: label => `${formatter.format(label)}  `,
                    },
                    gridLines: {
                        display: true,
                    }
                }
            ],
        }*/
    }
    
    return (
        <Bar data={ data } options={ options }/>
    )
}

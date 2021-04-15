import { useRef, useEffect } from 'react'
import Chart from 'chart.js'


export default function CrossSurveyChart({ data:results }) {
    const chartRef = useRef()

    useEffect(() => {
        const chart = new Chart(chartRef.current, {
                type: "line",
                data: getData(results),
                options: getChartOptions(),
            }
        )
        // 101 miliseconds, because the sidebar needs 100 ms to expand.
        setTimeout(() => chart.resize(), 101)
    }, [])
    
    return (
        <div className="line-chart">
            <canvas ref={chartRef}></canvas>
        </div>
    )
}


const getData = (results) => {
    const data = {
        labels: results.map(result => new Intl.DateTimeFormat(window.navigator.language || "en").format(result.datetime)),
        datasets: [
            {
                data: results.map(result => result.count),
                borderColor: "#BBD9DB",
                hoverBackgroundColor: "#a1c1c2",
                backgroundColor: "#BBD9DB77",
                borderWidth: 5,
                fill: true,
                label: "Participants",
            },
        ],
    }
    return data
}


const getChartOptions = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: window.innerWidth / (window.innerHeight/2) < 1.5 ? 1.5 : window.innerWidth / (window.innerHeight/2),
        legend: { display: false },
        tooltips: {
            callbacks: {
                label: (item, data) => {
                    const votes = item.value
                    const label = data.datasets[item.datasetIndex].label
                    return [`${votes} Participants`]
                },
            },
            custom: tooltip => {
                if (!tooltip) return
                // Disable color box
                tooltip.displayColors = false
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                    callback: label => `${label} Participants`,
                },
                stacked: false,
            }]
        },
    }
    return options
}
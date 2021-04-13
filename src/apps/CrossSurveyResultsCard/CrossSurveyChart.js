import { useRef, useEffect } from 'react'
import Chart from 'chart.js'


export default function CrossSurveyChart({ element }) {
    const chartRef = useRef()

    useEffect(() => {
        const chart = new Chart(chartRef.current, {
                type: "line",
                data: getData(element),
                options: getChartOptions(element),
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


const getData = ({datetime_result, answer_possibilities}) => {
    const data = {
        labels: datetime_result.map(dt_result => new Intl.DateTimeFormat(window.navigator.language || "en").format(dt_result.datetime)),
        datasets: [
            {
                data: datetime_result.results,
                backgroundColor: "#BBD9DB",
                hoverBackgroundColor: "#a1c1c2",
                borderWidth: 2,
                fill: false,
                label: answer_possibilities.answer,
            },
        ],
    }
    return data
}


const getChartOptions = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            callbacks: {
                label: (item, data) => {
                    const votes = item.value
                    const label = data.datasets[item.datasetIndex].label
                    return [`${label}: ${votes} Answers`]
                },
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                    callback: label => `${label} Answers`,
                },
                stacked: false,
            }]
        },
    }
    return options
}
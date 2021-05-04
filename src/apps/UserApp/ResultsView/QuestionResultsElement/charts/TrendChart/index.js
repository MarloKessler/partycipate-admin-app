import "./style.css"
import { useRef, useEffect, useState } from 'react'
import Chart from 'chart.js'
import { getBGColors } from "../utils"


export const TrendChartMode = {
    stacked: "stacked",
    single: "single",
}


export default function TrendChart({ element, mode }) {
    const chartRef  = useRef()
    const [stackedChart, setStackedChart] = useState(false)
    const [chart, setChart] = useState()

    useEffect(() => {
        const chart = new Chart(chartRef.current, {
                type: "line",
                data: getData(element),
                options: getChartOptions(element),
            }
        )
        setChart(chart)
        // 101 miliseconds, because the sidebar needs 100 ms to expand.
        setTimeout(() => chart.resize(), 101)
    }, [])


    useEffect(() => {
        if (!chart) return
        setStackedChart(true)
        chart.options.scales.yAxes[0].stacked = mode === TrendChartMode.stacked
        chart.update()
    }, [mode])
    
    
    return (
        <div className="line-chart">
            <canvas ref={chartRef}/>
        </div>
    )
}


const getData = ({datetime_result, answer_possibilities}) => {
    const [bgColors, hoverBGColors] = getBGColors(answer_possibilities.length)
    const data = {
        labels: datetime_result.map(dt_result => new Intl.DateTimeFormat(window.navigator.language || "en").format(dt_result.datetime)),
        datasets: answer_possibilities.map((possibility, index) => (
            {
                data: datetime_result.map(dt_result => dt_result.result.results[index]),
                backgroundColor: bgColors[index],
                hoverBackgroundColor: hoverBGColors[index],
                borderWidth: 1,
                fill: true,
                label: possibility.answer,
            }
        )),
    }
    return data
}


const getChartOptions = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: window.innerWidth / (window.innerHeight/2) < 1.5 ? 1.5 : window.innerWidth / (window.innerHeight/2),
        tooltips: {
            callbacks: {
                label: (item, data) => {
                    const votes = item.value
                    const label = data.datasets[item.datasetIndex].label
                    return [`${label}: ${votes} Votes`]
                },
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                    callback: label => `${label} Votes`,
                },
                stacked: false,
            }]
        },
    }
    return options
}
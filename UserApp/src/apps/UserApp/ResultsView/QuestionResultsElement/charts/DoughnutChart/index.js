import "./style.css"
import { useRef, useEffect } from 'react'
import Chart from 'chart.js'
import { getBGColors } from "../utils"


export default function DoughnutChart({ element }) {
    const chartRef  = useRef()
    const legendRef = useRef()

    useEffect(() => {
        const chart = new Chart(chartRef.current, {
                type: "doughnut",
                data: getData(element),
                options: getChartOptions(element),
            }
        )
        legendRef.current.innerHTML = chart.generateLegend()
        // 101 miliseconds, because the sidebar needs 100 ms to expand.
        setTimeout(() => chart.resize(), 101)
    }, [])
    
    return (
        <div className="doughnut-chart">
            <canvas ref={ chartRef } style={{maxWidth: "40%"}}></canvas>
            <div className="legend" ref={ legendRef }></div>
        </div>
    )
}


const getData = ({ answer_possibilities, results }) => {
    const [bgColors, hoverBGColors] = getBGColors(answer_possibilities.length)
    const data = {
        labels: answer_possibilities.map(possibility => possibility.answer),
        datasets: [{
                //Mapping is necessary since Chartjs fills it with additional data
                data: results.map(result => result),
                backgroundColor: bgColors,
                borderColor: 'transparent',
                hoverBackgroundColor: hoverBGColors,
                borderWidth: 1,
        }],
    }
    return data
}


const getChartOptions = ({ results, count_participants }) => {
    const formatter = new Intl.NumberFormat(window.navigator.language || "en", { style: 'percent', maximumFractionDigits: 0 })
    const options = {
        maintainAspectRatio: true,
        legend: { display: false },
        legendCallback: chart => {
            var html = ""
            const dataset = chart.data.datasets[0]
            dataset.data.forEach((data, index) => {
                html += `
                <div class="legend-item">
                    <div class="li-colorbox" style="background-color: ${dataset.backgroundColor[index]};"></div>
                    <div class="li-label">${chart.data.labels[index]}</div>
                </div>`
            })
            return html
        },
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: (item, data) => {
                    const percentage = data.datasets[item.datasetIndex].data[item.index] / count_participants
                    const percentageString = formatter.format(percentage)
                    const votes = results[item.index]
                    return [`${percentageString} (${votes} Votes)`]
                },
            },
            custom: tooltip => {
                if (!tooltip) return
                // Disable color box
                tooltip.displayColors = false

                // Make tooltip body as title
                const body = tooltip.body
                if (body && body.length > 0) {
                    tooltip.title = body[0].lines
                    body[0].lines = []
                }
            },
        },
    }

    return options
}
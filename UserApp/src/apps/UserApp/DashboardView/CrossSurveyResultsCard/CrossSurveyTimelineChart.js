import { useRef, useEffect, useState, useMemo } from 'react'
import Chart from 'chart.js'


export default function CrossSurveyTimelineChart({ data:results, ...props }) {
    const chartRef = useRef()
    const mql = useMemo(() => window.matchMedia("(prefers-color-scheme: dark)"), [])
    const [chart, setChart] = useState()


    useEffect(() => {
        const chart = new Chart(chartRef.current, {
                type: "line",
                data: getData(results),
                options: getChartOptions(mql.matches),
            }
        )
        setChart(chart)
        // 101 miliseconds, because the sidebar needs 100 ms to expand.
        setTimeout(() => chart.resize(), 101)
    }, [])


    // Color preference listener
    useEffect(() => {
        const listener = event => adaptChartColorScheme(chart, event.matches)
        mql.addEventListener("change", listener)
        return () => mql.removeEventListener("change", listener)
    }, [chart])

    function adaptChartColorScheme(chart, isDark) {
        const fontColor = isDark ? "#eee" : "#000"
        chart.options.legend.labels.fontColor = fontColor
        chart.options.scales.xAxes[0].ticks.fontColor = fontColor
        chart.options.scales.yAxes[0].ticks.fontColor = fontColor
        chart.update()
    }

    
    return (
        <div className="cross-survey-results-timeline-chart" {...props}>
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


const getChartOptions = (isDark) => {
    const textColor = isDark ? "#eee" : "#000"
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
            xAxes: [{
                ticks: {
                    fontColor: textColor,
                },
            }],
            yAxes: [{
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                    fontColor: textColor,
                    callback: label => `${label} Participants`,
                },
                stacked: false,
            }]
        },
    }
    return options
}
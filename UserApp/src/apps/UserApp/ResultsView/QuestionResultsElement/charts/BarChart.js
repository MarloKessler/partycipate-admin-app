import { useRef, useEffect, useMemo, useState } from 'react'
import Chart from 'chart.js'
import { getBGColors } from "./utils"


export default function BarChart({ element }) {
    const chartRef = useRef()
    const mql = useMemo(() => window.matchMedia("(prefers-color-scheme: dark)"), [])
    const [chart, setChart] = useState() 

    useEffect(() => {
        const chart = new Chart(chartRef.current, {
                type: "bar",
                data: getData(element),
                options: getChartOptions(element, mql.matches),
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

    
    return <canvas className="bar-chart" ref={ chartRef }></canvas>
}


const getData = ({ answer_possibilities, results, count_participants }) => {
    const dataItems = results.map(item => item/count_participants)
    const [bgColors, hoverBGColors] = getBGColors(answer_possibilities.length)
    const data = {
        labels: answer_possibilities.map(possibility => possibility.answer),
        datasets: [{
                data: dataItems,
                backgroundColor: bgColors,
                borderColor: 'transparent',
                hoverBackgroundColor: hoverBGColors,
                borderWidth: 1,
        }],
    }
    return data
}


const getChartOptions = ({ results }, isDark) => {
    const textColor = isDark ? "#eee" : "#000"
    const formatter = new Intl.NumberFormat(window.navigator.language || "en", { style: 'percent', maximumFractionDigits: 0 })

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: window.innerWidth / (window.innerHeight/2) < 1.5 ? 1.5 : window.innerWidth / (window.innerHeight/2),
        legend: { 
            display: false,
            labels: {
                fontColor: textColor,
            }
         },
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                title: ([item], data) => {
                    const percentage = data.datasets[item.datasetIndex].data[item.index]
                    const percentageString = formatter.format(percentage)
                    const votes = results[item.index]
                    return [`${percentageString} (${votes} Votes)`]
                },
                label: () => {},
            },
            custom: tooltip => {
                if (!tooltip) return
                // Disable color box
                tooltip.displayColors = false
            },
        },
        scales: {
          xAxes: [
              {
                  ticks: {
                      beginAtZero: true,
                      fontColor: textColor,
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
                      fontColor: textColor,
                      callback: label => `${formatter.format(label)}  `,
                  },
                  gridLines: {
                      display: true,
                  }
              }
          ],
      },
    }

    return options
}



const formatLabel = (str, maxwidth = 20) => {
    var sections = []
    var words = str.split(" ")
    var temp = ""

    words.forEach((item, index) => {
        if (temp.length > 0) {
            var concat = `${temp} ${item}`

            if (concat.length > maxwidth) {
                sections.push(temp)
                temp = "";
            } else {
                if(index == (words.length-1)) return sections.push(concat)
                else return temp = concat
            }
        }

        if (index == words.length - 1) return sections.push(item)

        if(item.length < maxwidth) temp = item
        else sections.push(item)
    })

    return sections
}

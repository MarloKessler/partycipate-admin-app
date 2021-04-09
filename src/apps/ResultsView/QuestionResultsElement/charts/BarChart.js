import { useRef, useEffect } from 'react'
import Chart from 'chart.js'


export default function BarChart({ element }) {
    const chartRef  = useRef()

    useEffect(() => {
        new Chart(chartRef.current, {
                type: "bar",
                data: getData(element),
                options: getChartOptions(element),
            }
        )
    }, [])
    
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


const getBGColors = length => {
    const factor = 100/(length + 1)
    const bgColors      = []
    const hoverBGColors = []
    var i
    for (i = 1; i <= length; i++) {
        bgColors.push(`hsl(184, 31%, ${100 - i * factor}%)`)
        hoverBGColors.push(`hsl(184, 31%, ${100 - i * factor + 0.5 * factor}%)`)
    }
    return [bgColors, hoverBGColors]
}


const getChartOptions = ({ results }) => {
    const formatter = new Intl.NumberFormat(window.navigator.language || "en", { style: 'percent', maximumFractionDigits: 0 })

    const options = {
        legend: { display: false },
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

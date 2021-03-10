import { h } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import Chart from "chart.js"
import distinctColors from 'distinct-colors'
import ChartDataLabels from 'chartjs-plugin-datalabels'


export function XChoiceResults({ element }) {
    const content = element.content
    const chartCont = useRef()
    const chartRef  = useRef()

    useEffect(() => setResultsChart(content, chartRef.current), [ content ])

    return (
        <div>
            <div className="question">
                <h3>{ content.question }</h3>
                <p><small>(Multiple choices possible)</small></p>
            </div>
            
            <div ref={ chartCont } className="chart-container">
                <canvas ref={ chartRef }/>
            </div>
        </div>
    )
}



const setResultsChart = (content, canvas) => {
    const barColors = distinctColors({
        count: content.answers.length,
        chromaMin: 80,
    })

    const formatter = new Intl.NumberFormat(window.navigator.language || "en", {
        style: 'percent',
        maximumFractionDigits: 0
    })

    new Chart(canvas, {
        plugins: [ChartDataLabels],
        type: "bar",
        data: {
            labels: content.answers,
            datasets: [
                {
                    label: content.question,
                    data: content.responses,
                    backgroundColor: barColors,
                    hoverBackgroundColor: barColors,
                    borderColor: "transparent",
                }
            ]
        },
        options: {
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
            tooltips: {
                enabled: false,
            },
            plugins: {
                datalabels: {
                    clamp: true,
                    color: 'white',
                    font: {
                        size: 15,
                        weight: "bold",
                    },
                    formatter: number => formatter.format(number),
                }
            },
        }
    })
}


function formatLabel(str, maxwidth = 20){
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function(item, index){
        if(temp.length > 0)
        {
            var concat = temp + ' ' + item;

            if(concat.length > maxwidth){
                sections.push(temp);
                temp = "";
            }
            else{
                if(index == (words.length-1))
                {
                    sections.push(concat);
                    return;
                }
                else{
                    temp = concat;
                    return;
                }
            }
        }

        if(index == (words.length-1))
        {
            sections.push(item);
            return;
        }

        if(item.length < maxwidth) {
            temp = item;
        }
        else {
            sections.push(item);
        }

    });

    return sections;
}
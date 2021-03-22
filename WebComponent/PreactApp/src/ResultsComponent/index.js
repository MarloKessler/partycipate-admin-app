import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import Chart from "chart.js"
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Server from "../Server"
import { XChoiceResults } from "./results-elements"


export default ResultsComponent


function ResultsComponent({ survey }) {
    const [results, setResults] = useState()
    

    // Setup chart.js
    useEffect(() => {
        Chart.defaults.global.legend.display = false;
        Chart.plugins.register(ChartDataLabels)
    }, [])

    useEffect(() => {
        Server.getSurveyResults(survey.id)
        .then(resultsArray => {
            survey.elements[0].answerPossibilities.sort((a, b) => {
                if ( a.position < b.position ){
                    return -1;
                  }
                  if ( a.position > b.position ){
                    return 1;
                  }
                  return 0;
            })
            survey.elements[0].results = resultsArray[0].results
            survey.elements[0].count_participants = resultsArray[0].count_participants
            setResults(survey)
        })
    }, [ survey ])

    return (
        <div>
            { results && results.elements.map(element => {
                switch (element.type) {
                    case "single-choice":
                    case "multiple-choice": return <XChoiceResults element={ element }/>
                    default: return <div></div>
                }
            }) }
        </div>
    )
}
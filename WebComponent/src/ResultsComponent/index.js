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
            resultsArray.forEach(resultObject => {
                const element = survey.elements.find(element => element.id == resultObject.element_id)
                if(!element) return
                element.results = resultObject.results
                element.count_participants = resultObject.count_participants
            })
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
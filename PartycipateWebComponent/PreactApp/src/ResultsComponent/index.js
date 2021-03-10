import { h } from "preact"
import { useEffect, useState } from "preact/hooks"
import Server from "../Server"
import { XChoiceResults } from "./results-elements"


export default ResultsComponent


function ResultsComponent({ surveyID }) {
    const [results, setResults] = useState()

    useEffect(() => {
        Server.getSurveyResults(surveyID)
        .then(setResults)
    }, [ surveyID ])

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
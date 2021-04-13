import "./style.css"
import { useState, useEffect } from "react"
import CardElement from "../CardElement"
import Server from "../Server"
import CrossSurveyChart from "./CrossSurveyChart"


export default function CrossSurveyResultsCard() {
    const [crossSurveyResults, setCrossSurveyResults] = useState({ count_participants: 15 })

    useEffect(() => {
        /*
        Server.database().getCrossSurveyResults()
        .then(setCrossSurveyResults)
        .catch(() => {})
        */
    }, [])
    
    if (crossSurveyResults) return (
        <CardElement className="cross-survey-results-card primary-element">
            <div className="csr-header">
                <h2>Overall results</h2>
                <h3>{ crossSurveyResults.count_participants } Answers</h3>
            </div>
            <CrossSurveyChart data={crossSurveyResults.data}/>
        </CardElement>
    )
    else return <div/>
}
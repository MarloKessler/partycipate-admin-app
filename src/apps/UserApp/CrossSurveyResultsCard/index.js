import "./style.css"
import { useState, useEffect } from "react"
import { CardElement } from "../../utilElements"
import Server from "../../Server"
import CrossSurveyChart from "./CrossSurveyChart"


export default function CrossSurveyResultsCard({ className="", ...props }) {
    const [crossSurveyResults, setCrossSurveyResults] = useState()

    useEffect(() => {
        Server.database().getCrossSurveyResults()
        .then(setCrossSurveyResults)
        .catch(() => {})
    }, [])
    
    if (crossSurveyResults) return (
        <CardElement className={`cross-survey-results-card primary-element ${className}`} {...props}>
            <h2>Overall participants</h2>
            <CrossSurveyChart data={crossSurveyResults}/>
        </CardElement>
    )
    else return <div/>
}
import "./style.css"
import { useState, useEffect } from "react"
import CardElement from "../CardElement"
import Server from "../Server"
import CrossSurveyChart from "./CrossSurveyChart"


export default function CrossSurveyResultsCard({ className="" }) {
    const [crossSurveyResults, setCrossSurveyResults] = useState()

    useEffect(() => {
        Server.database().getCrossSurveyResults()
        .then(setCrossSurveyResults)
        .catch(() => {})
    }, [])
    
    if (crossSurveyResults) return (
        <CardElement className={`cross-survey-results-card primary-element ${className}`}>
            <h2>Overall participants</h2>
            <CrossSurveyChart data={crossSurveyResults}/>
        </CardElement>
    )
    else return <div/>
}
import "./style.css"
import { useState, useEffect } from "react"
import { CardElement, PaginationElement } from "../../../utilElements"
import Server from "../../../Server"
import CrossSurveyTimelineChart from "./CrossSurveyTimelineChart"
import GeoChart from "../../GeoChart"


export default function CrossSurveyResultsCard({ className="", ...props }) {
    const [timelineResults, setTimelineResults] = useState()
    const [mapResults, setMapResults] = useState()

    useEffect(() => {
        Server.database().getCrossSurveyMapResults()
        .then(setMapResults)
        .catch(() => {})

        Server.database().getCrossSurveyTimelineResults()
        .then(setTimelineResults)
        .catch(() => {})
    }, [])
    

    if (mapResults && timelineResults) return (
        <CardElement className={`cross-survey-results-card primary-element ${className}`} {...props}>
            <PaginationElement>
                <MapResultsCard data={mapResults}/>
                <TimelineResultsCard timelineResults={timelineResults}/>
            </PaginationElement>
        </CardElement>
    )
    else return <div/>
}


function MapResultsCard({data}) {
    return (
        <div>
            <h2>Overall participants</h2>
            <GeoChart data={data} className="csrc-map"/>
        </div>
    )
}


function TimelineResultsCard({timelineResults}) {
    return (
        <div>
            <h2>Participants over time</h2>
            <CrossSurveyTimelineChart data={timelineResults}/>
        </div>
    )
}
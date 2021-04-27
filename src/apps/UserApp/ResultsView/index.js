import "./style.css"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Server from "../../Server"
import { ErrorPage, PageTitleElement, StandardPage } from "../../utilElements"
import QuestionResultsElement from "./QuestionResultsElement"
import GeoChart from "./GeoChart"


export function ResultsView() {
    const { id } = useParams()
    const [ survey, setSurvey ] = useState()

    useEffect(() => {
        Server.database().getSurveyResults(id)
        .then(setSurvey)
        .catch(() => setSurvey(null))
    }, [])

    function Content() {
        if (survey) return (
            <div>
                <PageTitleElement className="so-page-title">{ survey.title }</PageTitleElement>
                { Array.isArray(survey.map_results) && <GeoChart data={survey.map_results}/> }
                { Array.isArray(survey.elements) && survey.elements.map((element, index) => <QuestionResultsElement className="primary-element" element={element} key={index}/>) } 
            </div>
        )
        else if (survey === null) return <ErrorPage message="We re sorry, the survey you requested couldn't be found."/>
        else return <h3>Loading Results…</h3>
    }
    
    return (
        <StandardPage className= "survey-results"> 
            <Content/>
        </StandardPage>
    )
}

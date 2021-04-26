import "./style.css"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Server from "../../Server"
import { ErrorPage, PageTitleElement, StandardPage } from "../../utilElements"
import QuestionResultsElement from "./QuestionResultsElement"


export function ResultsView() {
    const { id } = useParams()
    const [ survey, setSurvey ] = useState()

    useEffect(() => {
        Server.database().getSurveyResults(id)
        .then(setSurvey)
        .catch(() => setSurvey(null))
    }, [])
    
    return (
        <StandardPage className= "survey-results"> 
            { survey
                ? <div>
                    <PageTitleElement className="so-page-title">{ survey.title }</PageTitleElement>
                    { survey.elements.map((element, index) => <QuestionResultsElement className="primary-element" element={element} key={index}/>) } 
                </div>
                : survey === null && <ErrorPage message="We re sorry, the survey you requested couldn't be found."/>
            }
        </StandardPage>
    )
}

import "./style.css"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"
import ErrorPage from "../ErrorPage"
import QuestionResultsElement from "./QuestionResultsElement"


export default ResultsView


function ResultsView() {
    const [ survey, setSurvey ] = useState()
    const { id } = useParams()

    useEffect(() => {
        Server.database().getSurveyResults(id)
        .then(setSurvey)
        .catch(() => setSurvey(null))
    }, [])
    
    return (
        <div className= "survey-results"> 
            { survey
                ? <div>
                    <PageTitleElement className="so-page-title">{ survey.title }</PageTitleElement>
                    { survey.elements.map((element, index) => <QuestionResultsElement element={ element } key={ index }/>) } 
                </div>
                : survey === null && <ErrorPage message="We re sorry, the survey you requested couldn't be found."/>
            }
        </div>
    )
}

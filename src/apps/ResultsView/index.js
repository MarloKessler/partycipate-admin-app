import "./style.css"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"
import SingleChoiceChart from "./QuestionResultsElement/charts/SingleChoiceChart"



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
            { survey &&
            <div>
                 <PageTitleElement>{ survey }</PageTitleElement>
                <div className="SingleChoiceChart">
                    <SingleChoiceChart element={survey.element[0]}></SingleChoiceChart>
                </div> 
            </div> }
        </div>
    )
}

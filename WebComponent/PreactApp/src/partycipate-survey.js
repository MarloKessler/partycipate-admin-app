import { h } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import register from "preact-custom-element"
import Cookies from 'js-cookie'
import Server from "./Server"
import setStyle from "./setStyle"
import SurveyComponent from "./SurveyComponent"
import ResultsComponent from "./ResultsComponent"


function PartycipateSurvey(props) {
    const surveyID = props.surveyId
    const containerRef = useRef()

    const [survey, setSurvey] = useState()
    const [view, setView] = useState(Cookies.get(`partycipate-survey-${surveyID}-partycipated`) ? PSView.results : PSView.survey)

    // Set style
    useEffect(() => setStyle(containerRef.current), [])
    // Load Survey
    useEffect(() => Server.getSurvey(surveyID).then(survey => {
        console.log("survey: ", survey)
        setSurvey(survey)
    }), [])

    return (
        <div ref={ containerRef } className="partycipate-survey-container">
            { survey && <View view={ view } survey={ survey } onChange={ setView }/> }
        </div>
    )
}


function View({ view, survey, onChange }) {
    console.log("view: ", view)
    switch (view) {
        case PSView.survey: return <SurveyComponent survey={ survey } responseSent={ () => onChange(PSView.results) }/>
        case PSView.results: return <ResultsComponent survey={ survey }/>
        default: return <div></div>
    }
}


const PSView = {
    survey: 1,
    results: 2,
}

register(PartycipateSurvey, "partycipate-survey", ["survey-id"], { shadow: true }) // Set shadow: true before build

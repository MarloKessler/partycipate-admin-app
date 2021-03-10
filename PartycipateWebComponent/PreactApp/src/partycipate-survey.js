import { h } from "preact"
import { useEffect, useRef, useState } from "preact/hooks"
import register from "preact-custom-element"
import Cookies from 'js-cookie'
import setStyle from "./setStyle"
import SurveyComponent from "./SurveyComponent"
import ResultsComponent from "./ResultsComponent"


function PartycipateSurvey(props) {
    const surveyID = props.surveyId
    const containerRef = useRef()
    const [view, setView] = useState(Cookies.get(`partycipate-survey-${surveyID}-partycipated`) ? PSView.results : PSView.survey)

    useEffect(() => setStyle(containerRef.current), [])

    return (
        <div ref={ containerRef } className="partycipate-survey-container">
            <View view={ view } surveyID={ surveyID } onChange={ setView }/>
        </div>
    )
}


function View({ view, surveyID, onChange }) {
    switch (view) {
        case PSView.survey: return <SurveyComponent surveyID={ surveyID } responseSent={ () => onChange(PSView.results) }/>
        case PSView.results: return <ResultsComponent surveyID={ surveyID }/>
        default: return <div></div>
    }
}


const PSView = {
    survey: 1,
    results: 2,
}

register(PartycipateSurvey, "partycipate-survey", ["survey-id"], { shadow: false }) // Set shadow: true before build

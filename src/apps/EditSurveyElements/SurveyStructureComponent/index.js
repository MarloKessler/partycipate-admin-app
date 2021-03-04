import { useEffect, useRef } from "react"
import "./style.css"
import ESComponentContainer from "../ESComponentContainer"
import { QuestionElement } from "./survey-elements"


export default SurveyStructureComponent


function SurveyStructureComponent({ survey = { title: "Random Question Survey", elements: [{ id: 123, type: "multiple-choice", content: { question: "How much is the fish?", answers: [ "42", "$30000", "There is nothing so big to imagine…" ] } }]} }) {
    const nameInpRef     = useRef()

    return (
        <ESComponentContainer title="2 - Specify the details of your survey" className="survey-structure-component">
            { survey
                ? <div className="survey-structure-body">
                    <label>Survey Name</label>
                    <input ref={ nameInpRef } className="input s-name-input" type="text" value={ survey.title }/>
                    <small>The name will not be shown to the user.</small>
                    { survey.elements.map( element => <QuestionElement key={ element.id } element={ element }/> ) }
                </div>
                : <div className="loading" >Loading ...</div>
            }
        </ESComponentContainer>
    )
}
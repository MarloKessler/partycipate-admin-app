import "./style.css"
import { useContext } from "react"
import { FiTrash2 } from "react-icons/fi"
import SurveyContext from "../SurveyContext"
import { QuestionElement } from "./survey-elements"
import CardElement from "../../CardElement"
import CreateSurveyError from "../CreateSurveyError"


export default function EditSurveyComponent({errors}) {
    const { survey, updateSurvey } = useContext(SurveyContext)

    const updateName = event => {
        survey.title = event.target.value
        updateSurvey(survey)
    }

    function addElement() {
        const elements = survey.elements
        if (!Array.isArray(elements)) return
        elements.push({ position: elements.length, type: "single-choice", question: "", answer_possibilities: [ { position: 1, answer: "" } ], may_skip: false, })
        updateSurvey(survey)
    }

    function deleteElement(index) {
        const elements = survey.elements
        if (!Array.isArray(elements)) return
        elements.splice(index, 1)
        elements.forEach((element, index) => element.position = index)
        updateSurvey(survey)
    }
    
    return (
        <div className="edit-survey-component">
            <label>Survey name</label>
            <input className="s-name-input" type="text" value={ survey.title } placeholder="Name" onChange={ updateName }/>
            { (Array.isArray(errors) && errors.includes(CreateSurveyError.titleIsEmpty))
                ? <small className="error">The name is empty.</small>
                : <small>The name will not be shown to the user.</small>
            }
            
            { survey.elements && survey.elements.map( (_, index) =>  <SurveyElement index={index} onDelete={deleteElement}/>) }
            <button className="btn-dark" onClick={addElement}>Add Question</button>
        </div>
    )
}


function SurveyElement({index, onDelete}) {
    return (
        <div className="survey-element-container">
            <CardElement className="primary-element">
                <QuestionElement className="survey-element" index={ index } key={ index }/>
            </CardElement>
            <button className="btn-dark trash-btn" title="Delete Answer" onClick={ () => onDelete(index) }><FiTrash2/></button>
        </div>
    )
}
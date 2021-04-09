import "./style.css"
import { useContext } from "react"
import SurveyContext from "../SurveyContext"
import { QuestionElement } from "./survey-elements"


export default function EditSurveyComponent() {
    const { survey, updateSurvey } = useContext(SurveyContext)

    const updateName = event => {
        survey.title = event.target.value
        updateSurvey(survey)
    }
    
    return (
        <div className="edit-survey-component">
            <label>Survey name</label>
            <input className="s-name-input" type="text" value={ survey.title } placeholder="Name" onChange={ updateName }/>
            <small>The name will not be shown to the user.</small>
            { survey.elements && survey.elements.map( (_, index) => <QuestionElement className="survey-element" index={ index } key={ index }/> ) }
        </div>
    )
}
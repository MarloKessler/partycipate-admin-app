import "./style.css"
import { useContext } from "react"
import ESComponentContainer from "../ESComponentContainer"
import SurveyContext from "../SurveyContext"
import { QuestionElement } from "./survey-elements"


export default SurveyStructureComponent


function SurveyStructureComponent() {
    const { survey, updateSurvey } = useContext(SurveyContext)

    const updateName = event => {
        survey.title = event.target.value
        updateSurvey(survey)
    }
    
    return (
        <ESComponentContainer title="2 - Specify the details of your survey">
            <div className="edit-survey-component-body">
                <label>Survey name</label>
                <input className="input s-name-input" type="text" value={ survey.title } placeholder="Name" onChange={ updateName }/>
                <small>The name will not be shown to the user.</small>
                { survey.elements && survey.elements.map( (_, index) => <QuestionElement className="survey-element" index={ index } key={ index }/> ) }
            </div>
        </ESComponentContainer>
    )
}
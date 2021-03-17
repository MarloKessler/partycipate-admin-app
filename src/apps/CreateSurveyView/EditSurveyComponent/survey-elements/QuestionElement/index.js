import "./style.css"
import { useContext } from "react"
import SurveyContext from "../../../SurveyContext"
import { XCoiceBlock } from "./content-blocks"



export { QuestionElement }


function QuestionElement({ index, ...props }) {
    const { survey, updateSurvey } = useContext(SurveyContext)
    const element = survey.elements[index]

    const updateQuestion = event => {
        element.question = event.target.value
        survey.elements[index] = element
        updateSurvey(survey)
    }


    return (
        <div { ...props }>
            <label>Define your question</label>
            <input className="input s-question-input" type="text" value={ element.question } placeholder="Question" onChange={ updateQuestion }/>
            <XCoiceBlock elementIndex={ index } />
        </div>
    )
}

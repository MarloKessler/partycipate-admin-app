import "./style.css"
import { useContext } from "react"
import SurveyContext from "../../../SurveyContext"
import { XCoiceBlock } from "./content-blocks"


export function QuestionElement({ index, className="", ...props }) {
    const { survey, updateSurvey } = useContext(SurveyContext)
    const element = survey.elements[index]

    const updateQuestion = event => {
        element.question = event.target.value
        survey.elements[index] = element
        updateSurvey(survey)
    }

    return (
        <div className={`question-element ${className}`} { ...props }>
            <label>Define your question</label>
            <input className="input s-question-input" type="text" value={ element.question } placeholder="Question" onChange={ updateQuestion }/>
            <XCoiceBlock elementIndex={ index } />
        </div>
    )
}

import "./style.css"
import { useContext } from "react"
import SurveyContext from "../../SurveyContext"
import { XCoiceBlock } from "./content-blocks"



export { QuestionElement }


function QuestionElement({ index, ...props }) {
    const { survey, updateSurvey } = useContext(SurveyContext)
    const content = survey.elements[index].content

    const updateQuestion = event => {
        content.question = event.target.value
        survey.elements[index].content = content
        updateSurvey(survey)
    }


    return (
        <div { ...props }>
            <label>Define your question</label>
            <input className="input s-question-input" type="text" value={ content.question } placeholder="Question" onChange={ updateQuestion }/>
            <XCoiceBlock elementIndex={ index } />
        </div>
    )
}





/*
import "./style.css"
import { XCoiceBlock } from "./content-blocks"


export { QuestionElement }


function QuestionElement({ element, onChange: updateElement }) {
    const updateQuestion = event => {
        const newElement = element
        newElement.content.question = event.target.value
        updateElement(newElement)
    }


    const updateContent = content => {
        const newElement = element
        newElement.content = content
        updateElement(newElement)
    }


    return (
        <div className="survey-element">
            <label>Define your question</label>
            <input className="input s-question-input" type="text" value={ element.content.question } onChange={ updateQuestion }/>
            
        </div>
    )
}
*/

//<XCoiceBlock content={ element.content } onChange={ updateContent } />
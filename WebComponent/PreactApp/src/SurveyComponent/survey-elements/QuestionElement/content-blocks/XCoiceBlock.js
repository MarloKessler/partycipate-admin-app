import { h } from "preact"
import { useContext, useRef } from "preact/hooks"
import SurveyContext from "../../../SurveyContext"


export function XCoiceBlock({ elementIndex }) {
    const { survey, response, updateResponse } = useContext(SurveyContext)
    const answersRef = useRef()
    const element = survey.elements[elementIndex]
    const answers = element.content.answers


    const onChangeResponse = () => {
        var participateAnswer = []
        const elements = answersRef.current.querySelectorAll(`input[name='${element.id}']`)
        elements.forEach((element, index) => { if (element.checked) participateAnswer.push(index) })
        response.elements[elementIndex].participateAnswer = participateAnswer
        updateResponse(response)
    }

    
    return (
        <div className="content-block xchoice-block">
            <ul ref={ answersRef } className="answers">
                { answers.map( ( _, index) => <AnswerCard elementIndex={ elementIndex } answerIndex={ index } onChange={ onChangeResponse } key={ index }/>) }
            </ul>
        </div>
    )
}


const AnswerCard = ({ elementIndex, answerIndex, onChange }) => {
    const { survey, response } = useContext(SurveyContext)
    const inputRef     = useRef()
    const element      = survey.elements[elementIndex]
    const answerOption = element.content.answers[answerIndex]

    const answerIsSelected = () => response.elements[elementIndex].participateAnswer.includes(answerIndex)
    const toggleAnswer     = () => inputRef.current.click()

    return (
        <li className={ `card-element answer-card answer-option ${ answerIsSelected() ? "selected" : ""}` } onClick={ toggleAnswer }>
            <input ref={ inputRef } type={ getInputTypeFor(element) } name={ element.id } value={ answerIndex } style={{ display: "none" }} onChange={ onChange }/>
            { answerOption }
        </li>
    )
}


const getInputTypeFor = element => {
    switch (element.type) {
        case "single-choice": return "radio"
        case "multiple-choice": return "checkbox"
        default: "radio"
    }
}

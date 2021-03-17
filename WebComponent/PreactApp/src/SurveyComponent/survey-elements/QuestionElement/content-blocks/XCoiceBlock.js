import { h } from "preact"
import { useContext, useRef } from "preact/hooks"
import SurveyContext from "../../../SurveyContext"


export function XCoiceBlock({ elementIndex }) {
    const { survey, response, updateResponse } = useContext(SurveyContext)
    const answersRef = useRef()
    const element = survey.elements[elementIndex]
    console.log("element: ", element)
    const answerPossibilities = element.answerPossibilities
    console.log("answerPossibilities: ", answerPossibilities)


    const onChangeResponse = () => {
        const elements = answersRef.current.querySelectorAll(`input[name='${element.id}']`)
        const answerArray = []
        elements.forEach((element) => {
            if (!element.checked) return
            const id = parseInt(element.value)
            answerArray.push({ answer_possibility_id: id })
        })
        response.elements[elementIndex].answer = answerArray
        updateResponse(response)
    }

    
    return (
        <div className="content-block xchoice-block">
            <ul ref={ answersRef } className="answers">
                { answerPossibilities.map( ( _, index) => <AnswerCard elementIndex={ elementIndex } answerIndex={ index } onChange={ onChangeResponse } key={ index }/>) }
            </ul>
        </div>
    )
}


const AnswerCard = ({ elementIndex, answerIndex, onChange }) => {
    const { survey, response } = useContext(SurveyContext)
    const inputRef     = useRef()
    const element      = survey.elements[elementIndex]
    const answerOption = element.answerPossibilities[answerIndex]
    
    const toggleAnswer     = () => inputRef.current.click()
    const answerIsSelected = () => {
        const resElement = response.elements[elementIndex]
        const matchingAnswerOption = resElement.answer.find(answerItem => answerItem.answer_possibility_id === answerOption.id)
        return matchingAnswerOption
    }

    return (
        <li className={ `card-element answer-card answer-option ${ answerIsSelected() ? "selected" : ""}` } onClick={ toggleAnswer }>
            <input ref={ inputRef } type={ getInputTypeFor(element) } name={ element.id } value={ answerOption.id } style={{ display: "none" }} onChange={ onChange }/>
            { answerOption.answer }
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

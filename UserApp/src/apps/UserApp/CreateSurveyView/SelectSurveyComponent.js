import "./style.css"
import { useContext } from "react"
import { v4 as uuid } from "uuid"
import SurveyContext from "./SurveyContext"
import { CardElement } from "../../utilElements"


export default function SelectSurveyComponent({ onTypeSelected }) {
    const { survey, updateSurvey } = useContext(SurveyContext)

    const onChooseSurveyType = type => {
        const element = survey.elements[0]
        if (element) element.type = type
        else survey.elements.push({ id: uuid(), type: type, question: "", answer_possibilities: [""], may_skip: true, })
        updateSurvey(survey)
        onTypeSelected()
    }

    return(
        <div>
            <CardElement className="primary-element link-light" onClick={() => onChooseSurveyType("single-choice")}>Single-choice</CardElement>
            <CardElement className="primary-element link-light" onClick={() => onChooseSurveyType("multiple-choice")}>Multiple-choice</CardElement>
        </div>
    )
}
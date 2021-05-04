import "./style.css"
import { useContext } from "react"
import SurveyContext from "./SurveyContext"
import { CardElement } from "../../utilElements"


export default function SelectSurveyComponent({ onTypeSelected }) {
    const { survey, updateSurvey } = useContext(SurveyContext)

    const onChooseSurveyType = type => {
        survey.elements[0].type = type
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
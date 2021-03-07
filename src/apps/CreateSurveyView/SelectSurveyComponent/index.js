import "./style.css"
import CardElement from "../../CardElement"
import ESComponentContainer from "../ESComponentContainer"

export default SelectSurveyComponent

function SelectSurveyComponent() {
    return(
        <ESComponentContainer className="select-survey-component" title="Create your survey:">
            <CardElement content="Single-choice"></CardElement>
            <CardElement content="Multiple-choice"></CardElement>
        </ESComponentContainer>
    )
}
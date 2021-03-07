import "./style.css"
import CardElement from "../../CardElement"
import ESComponentContainer from "../ESComponentContainer"
import { XCoiceBlock } from "../EditSurveyComponent/survey-elements/QuestionElement/content-blocks/XCoiceBlock"

export default SelectSurveyComponent

function SelectSurveyComponent() {
    return(
        <ESComponentContainer className="select-survey-component" title="Choose your survey type:">
            <div className="cards-hover">
                <CardElement className="cards" content="Single-choice" onClick={XCoiceBlock}></CardElement>
                <CardElement className="cards" content="Multiple-choice" onClick={XCoiceBlock}></CardElement>
                <CardElement className="cards" content="Star Valuation"></CardElement>
            </div>
        </ESComponentContainer>
    )
}
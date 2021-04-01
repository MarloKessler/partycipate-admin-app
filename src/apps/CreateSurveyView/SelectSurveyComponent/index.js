import "./style.css"
import { useContext } from "react"
import SurveyContext from "../SurveyContext"
import CardElement from "../../CardElement"
import ESComponentContainer from "../ESComponentContainer"


export default SelectSurveyComponent


function SelectSurveyComponent({ onTypeSelected }) {
    const { survey, updateSurvey } = useContext(SurveyContext)

    const onChooseSurveyType = type => {
        survey.elements[0].type = type
        updateSurvey(survey)
        onTypeSelected()
    }

    return(
        <div className="scroll">
        <ESComponentContainer className="select-survey-component" title="1 - Choose your survey type:">
            <div className="cards-hover">
                <CardElement className="cards" onClick={() => onChooseSurveyType("single-choice")}>Single-choice</CardElement>
                <CardElement className="cards" onClick={() => onChooseSurveyType("multiple-choice")}>Multiple-choice</CardElement>
            </div>
        </ESComponentContainer>
        </div>
    )
}
import CardElement from "../CardElement"
import { XCoiceBlock } from "../CreateSurveyView/EditSurveyComponent/survey-elements/QuestionElement/content-blocks/XCoiceBlock"
import ESComponentContainer from "../EditSurveyElements/ESComponentContainer"

export default CreateSurveyPage

// Not needed anymore?
function CreateSurveyPage() {
    return(
    <div className="surveys">
        <ESComponentContainer title="Create your survey:">
                <CardElement content="Single-choice"></CardElement>
        <CardElement content="Multiple-choice"></CardElement>
        </ESComponentContainer>
    </div>
    )
}
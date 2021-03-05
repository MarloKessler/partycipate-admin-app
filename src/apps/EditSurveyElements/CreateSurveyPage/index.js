import CardElement from "../../CardElement"
import ESComponentContainer from "../ESComponentContainer"

export default CreateSurveyPage

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
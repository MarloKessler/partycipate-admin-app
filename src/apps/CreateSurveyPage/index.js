import CardElement from "../CardElement"
import PageTitleElement from "../PageTitleElement"
import Sidebar from "../Sidebar"

export default CreateSurveyPage

function CreateSurveyPage() {
    return(
    <div className="surveys">
        <Sidebar></Sidebar>
        <PageTitleElement>Create your survey:</PageTitleElement>
        <CardElement content="Single-choice"></CardElement>
        <CardElement content="Multiple-choice"></CardElement>
    </div>
    )
}
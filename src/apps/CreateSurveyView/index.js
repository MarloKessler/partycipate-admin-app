import './style.css'
import SelectSurveyComponent from "./SelectSurveyComponent"
import EditSurveyComponent from "./EditSurveyComponent"
import ImplementSurveyComponent from "./ImplementSurveyComponent"


export default CreateSurveyView

function CreateSurveyView() {
    return(
        <div className="create-survey-view">
            <SelectSurveyComponent/>
        </div>
    )
}
import "./style.css"
import { CopyBlock, dracula } from "react-code-blocks"
import ESComponentContainer from "../ESComponentContainer"


export default ImplementSurveyComponent


function ImplementSurveyComponent({ surveyID="987631234567", token="1234567890" }) {
    const headCode = 
`<!-- Insert in head -->
<script src="https://www.google.de/surveys/" token="${token}" surveyID="${surveyID}"/>`

    const divCode = 
`<!-- Insert at the place where you want to show your survey -->
<div id="partycipate-survey-${surveyID}"/>`

    return (
        <ESComponentContainer title="3 - Implement your survey" className="implement-survey-component">
            <p>To implement your survey in any website, insert the following code:</p>
            <CopyBlock
                className="code-block"
                text={ headCode }
                language={ "html" }
                theme={ dracula }
            />

            <CopyBlock
                text={ divCode }
                language={ "html" }
                theme={ dracula }
            />
        </ESComponentContainer>
    )
}
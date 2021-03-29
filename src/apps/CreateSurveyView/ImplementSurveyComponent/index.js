import "./style.css"
import { useContext } from "react"
import SurveyContext from "../SurveyContext"
import { CopyBlock, dracula } from "react-code-blocks"
import ESComponentContainer from "../ESComponentContainer"


export default ImplementSurveyComponent


function ImplementSurveyComponent() {
    const { survey } = useContext(SurveyContext)
    const headCode = 
`<!-- Insert in head -->
<script src="${process.env.REACT_APP_SNIPPET_SCRIPT_URL}"></script>`

    const divCode = 
`<!-- Insert in body where you want to display your survey -->
<partycipate-survey survey-id="${survey.id}"/>`

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

            <p>Please adapt your privacy and cookie statement accordingly. A </p>
        </ESComponentContainer>
    )
}
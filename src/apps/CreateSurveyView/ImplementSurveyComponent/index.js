import "./style.css"
import { useContext } from "react"
import { Link } from "react-router-dom"
import SurveyContext from "../SurveyContext"
import { CopyBlock, dracula } from "react-code-blocks"


 export default function ImplementSurveyComponent() {
    const { survey } = useContext(SurveyContext)
    const headCode = 
`<!-- Insert in head -->
<script src="${process.env.REACT_APP_SNIPPET_SCRIPT_URL}"></script>`

    const divCode = 
`<!-- Insert in body where you want to display your survey -->
<partycipate-survey survey-id="${survey.id}"/>`

    return (
        <div className="implement-survey-component">
            <p>To implement your survey in any website, insert the following code:</p>
            <CopyBlock
                className="code-block"
                text={headCode}
                language={"html"}
                theme={dracula}
            />
            <CopyBlock
                text={divCode}
                language={"html"}
                theme={dracula}
            />
            <p>To be compliant with the GDPR, please adapt your privacy and cookie statement accordingly. For further help please <Link to="docs/create-survey">click here</Link>.</p>
        </div>
    )
}
import "./style.css"
import { HelpSections } from "../../../PublicApp"
import { CopyBlock, dracula } from "react-code-blocks"


export function ImplementSurveyComponent({ survey, className="" }) {
    const headCode = 
`<!-- Insert in head -->
<script src="${process.env.REACT_APP_SNIPPET_SCRIPT_URL}"></script>`

    const divCode = 
`<!-- Insert in body where you want to display your survey -->
<partycipate-survey survey-id="${survey.id}"/>`

    return (
        <div className={`implement-survey-component ${className}`}>
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
            <p>To be compliant with the GDPR, please adapt your privacy and cookie statement accordingly. For further help please <a href={`${window.location.origin}${process.env.REACT_APP_PATH_DOCS}/${HelpSections.createSurvey}`} target="_blank">click here</a>.</p>
        </div>
    )
}
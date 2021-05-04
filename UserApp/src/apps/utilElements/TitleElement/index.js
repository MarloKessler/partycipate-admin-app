import "./style.css";
import { HelpButton } from "../HelpButton"


export function TitleElement({ children, className = "", helpSection }) {
    return(
        <div className={ `page-title-element ${className}` }>
            <div className="pte-title">
                <h1>{ children }</h1>
                <div/>
            </div>
            { helpSection && <HelpButton className="pte-help-btn" section={helpSection}/> }
        </div>
    )
}

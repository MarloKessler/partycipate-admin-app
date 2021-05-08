import "./style.css";
import { HelpButton } from "../HelpButton"


export function TitleElement({ children, className="", toolbar, helpSection }) {
    return(
        <div className={ `page-title-element ${className}` }>
            <div className="pte-title">
                <h1>{ children }</h1>
                <div/>
            </div>
            <div>
                { toolbar }
                { helpSection && <HelpButton section={helpSection}/> }
            </div>
        </div>
    )
}

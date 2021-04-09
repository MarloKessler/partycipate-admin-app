import "./style.css";
import HelpButton from "../HelpButton"


export default function PageTitleElement({ children, className = "", helpSection }) {
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

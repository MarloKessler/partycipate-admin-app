import "./style.css";
import HelpButton from "../HelpButton"


export default function PageTitleElement({ children, className = "", helpSection }) {
    return(
        <div className={ `page-title-element ${className}` }>
            <div className="pte-title">
                <h1 className="PageTitle">{ children }</h1>
                <hr style={{
                    color: "#647374",
                    backgroundColor: "#647374",
                    height: 0.5,
                    marginLeft: 20,
                    width: 60
                }}/>
            </div>
            { helpSection && <HelpButton className="pte-help-btn" section={helpSection}/> }
        </div>
    )
}

import "./style.css"
import PageTitleElement from "../../PageTitleElement"

export default ESComponentContainer


function ESComponentContainer({ title, children, className = "" }) {
    return (
        <div className={ `es-element-container ${className}` }>
            <PageTitleElement>{ title }</PageTitleElement>
            <div className="replace-with-card-element">{ children }</div>
        </div>
    )
}
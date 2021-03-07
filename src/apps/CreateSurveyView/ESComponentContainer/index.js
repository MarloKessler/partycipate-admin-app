import "./style.css"
import PageTitleElement from "../../PageTitleElement"
import CardElement from "../../CardElement"


export default ESComponentContainer


function ESComponentContainer({ title, children, className = "" }) {
    return (
        <div className={ `es-component-container ${className}` }>
            <PageTitleElement>{ title }</PageTitleElement>
            <CardElement className="es-card-element">{ children }</CardElement>
        </div>
    )
}
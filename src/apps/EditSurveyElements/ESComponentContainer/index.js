import "./style.css"


export default ESComponentContainer


function ESComponentContainer({ title, children, className = "" }) {
    return (
        <div className={ `es-element-container ${className}` }>
            <h2 className="replace-with-title-element">{ title }</h2>
            <div className="replace-with-card-element">{ children }</div>
        </div>
    )
}
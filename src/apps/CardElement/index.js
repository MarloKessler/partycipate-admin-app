import "./style.css"


export default CardElement


function CardElement({ children, content, className = "", ...props }){
    return(
        <div className={ `CardElement ${className}` } {...props}>
            { children }
            { content }
        </div>
    )
}
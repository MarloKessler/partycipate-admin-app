import "./style.css"


export default CardElement


function CardElement({ children, className = "", ...props }){
    return(
        <div className={ `CardElement ${className}` } {...props}>
            { children }
        </div>
    )
}
import "./style.css"


export default CardElement


function CardElement({ children, className = "", elementRef, ...props }){
    return(
        <div className={ `CardElement ${className}` } ref={ elementRef } {...props}>
            { children }
        </div>
    )
}
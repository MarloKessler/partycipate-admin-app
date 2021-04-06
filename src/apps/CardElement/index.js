import "./style.css"


export default function CardElement({ children, className = "", elementRef, ...props }){
    return(
        <div className={ `card-element ${className}` } ref={ elementRef } {...props}>
            { children }
        </div>
    )
}
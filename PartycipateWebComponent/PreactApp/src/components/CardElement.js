
export default ({ children, className = "", ...props }) => {
    return(
        <div className={ `CardElement ${className}` } {...props}>
            { children }
        </div>
    )
}
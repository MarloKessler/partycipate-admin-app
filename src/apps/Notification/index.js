import "./style.css"
import CardElement from "../CardElement"


export default Notification


function Notification({ show, children }) {
    return <CardElement className={ `Notification ${show ? "show" : ""}` }>{ children }</CardElement>
}
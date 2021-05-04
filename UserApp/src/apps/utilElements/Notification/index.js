import "./style.css"
import { CardElement } from "../CardElement"


export function Notification({ show, children }) {
    return (
        <div className={`notification-container ${show ? "show" : ""}`}>
            <div className="n-bg"/>
            <CardElement className="notification primary-element">{ children }</CardElement>
        </div>
    )
}
import "./style.css"
import { CardElement } from "../CardElement"


export function Notification({ show, children, onClickBackgound }) {
    return (
        <div className={`notification-container ${show ? "show" : ""}`}>
            <div className="n-bg" onClick={() => onClickBackgound && onClickBackgound()}/>
            <CardElement className="notification primary-element">{ children }</CardElement>
        </div>
    )
}
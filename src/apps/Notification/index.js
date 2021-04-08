import "./style.css"
import CardElement from "../CardElement"


export default function Notification({ show, children }) {
    return (
        <div className={`notification-container ${show ? "show" : ""}`}>
            <div className="n-bg"/>
            <CardElement className="notification">{ children }</CardElement>
        </div>
    )
}
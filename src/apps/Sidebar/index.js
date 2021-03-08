import "./style.css"
import { Link } from "react-router-dom"

export default Sidebar


function Sidebar() {
    return (
        <div className="sidebar">
            <div className="item activatable"><Link to="/">Home</Link></div>
            <div className="item activatable"><Link to="/create-survey">Create Survey</Link></div>
            <div className="item activatable"><Link to="/surveys">View Results</Link></div>
            <div className="item activatable"><Link to="/my-account">My Account</Link></div>
            <div className="item activatable"><Link to="/get-help">Get Help</Link></div>
        </div>
    )
}
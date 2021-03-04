import "./style.css"
import {BrowserRouter as Router, Link} from "react-router-dom"

export default Sidebar


function Sidebar() {
    return (
        <Router>
        <div className="sidebar">
                <div className="activatable"><Link to="/">Home</Link></div>
                <div className="activatable"><Link to="/create-survey">Create Survey</Link></div>
                <div className="activatable"><Link to="/view-results">View Results</Link></div>
                <div className="activatable"><Link to="/my-account">My Account</Link></div>
                <div className="activatable"><Link to="/get-help">Get Help</Link></div>
            </div>
        </Router>
    )
}
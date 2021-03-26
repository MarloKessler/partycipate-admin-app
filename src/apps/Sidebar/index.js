import "./style.css"
import { Link } from "react-router-dom"

export default Sidebar


function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="/dashboard"><div className="item activatable">Home</div></Link>
            <Link to="/create-survey"><div className="item activatable">Create Survey</div></Link>
            <Link to="/surveys"><div className="item activatable">View Results</div></Link>
            <Link to="/my-account"><div className="item activatable">My Account</div></Link>
            <Link to="/docs"><div className="item activatable">Get Help</div></Link>
        </div>
    )
}
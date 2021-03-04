import "./style.css"
import { CgMenu, CgClose } from "react-icons/cg"
import { useRef, useState } from "react"
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom"


export default Sidebar


function Sidebar() {

    const [showMenu, setShowMenu] = useState(false)
    const sideMenuRef = useRef()

    const toggleMenu = () => {
        setShowMenu(!showMenu)
        sideMenuRef.current.classList.toggle("show-menu")
    }

    return (
        <Router>
        <div className="sidebar">
            <div className="menu-toggle item activatable"><button className="item" onClick={ toggleMenu }>{ showMenu ? <CgClose className="icon"/> : <CgMenu className="icon"/> }</button></div>
            <div className="side-menu" ref={ sideMenuRef }>
                
                <div className="item activatable"><Link to="/">Home</Link></div>
                <div className="item activatable"><Link to="/create-survey">Create Survey</Link></div>

                        <div className="item activatable level"><Link to="/survey-type">Survey Type</Link></div>
                        <div className="item activatable level"><Link to="/details">Details</Link></div>
                        <div className="item activatable level"><Link to="/customize">Customize</Link></div>
                        <div className="item activatable level"><Link to="/implement">Implement</Link></div>

                <div className="item activatable"><Link to="/view-results">View Results</Link></div>
                <div className="item activatable"><Link to="/my-account">My Account</Link></div>
                <div className="item activatable"><Link to="/get-help">Get Help</Link></div>
            </div>
        </div>
        </Router>
    )
}
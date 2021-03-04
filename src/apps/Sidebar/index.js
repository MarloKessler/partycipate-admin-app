import "./style.css"
import { CgMenu, CgClose } from "react-icons/cg"
import { useRef, useState } from "react"


export default Sidebar


function Sidebar() {

    const [showMenu, setShowMenu] = useState(false)
    const sideMenuRef = useRef()

    const toggleMenu = () => {
        setShowMenu(!showMenu)
        sideMenuRef.current.classList.toggle("show-menu")
    }

    return (
        <div className="sidebar">
            <div className="menu-toggle item activatable"><button className="item" onClick={ toggleMenu }>{ showMenu ? <CgClose className="icon"/> : <CgMenu className="icon"/> }</button></div>

            <div className="side-menu" ref={ sideMenuRef }>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/` }>Home</a></div>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/create-survey` } >Create Survey</a></div>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/view-results` }>View results</a></div>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/my-account` }>My Account</a></div>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/get-help` }>Get help</a></div>
            </div>
        </div>
    )
}
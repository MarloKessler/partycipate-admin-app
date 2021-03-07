import "./style.css"
import { CgMenu, CgClose } from "react-icons/cg"
import { useRef, useState } from "react"


export default Navbar


function Navbar() {

    const [showMenu, setShowMenu] = useState(false)
    const navMenuRef = useRef()

    const toggleMenu = () => {
        setShowMenu(!showMenu)
        navMenuRef.current.classList.toggle("show-menu")
    }
    
    return (
        <div className="navbar">
            <div className="item logo"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/` }><img src={ `${process.env.PUBLIC_URL}/images/logo.png` } /></a></div>

            <div className="menu-toggle item activatable"><button className="item" onClick={ toggleMenu }>{ showMenu ? <CgClose className="icon"/> : <CgMenu className="icon"/> }</button></div>
            
            <div className="nav-menu" ref={ navMenuRef }>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/` }>Home</a></div>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/why-partycipate` } >Why Partycipate</a></div>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/surveys` }>Surveys</a></div>
                <div className="item activatable"><a href={ `${process.env.REACT_APP_WEBSITE_URL}/contact` }>Contact</a></div>
            </div>
        </div>
    )
}
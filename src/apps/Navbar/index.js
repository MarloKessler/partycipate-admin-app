import "./style.css"
import { CgMenu, CgClose } from "react-icons/cg"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"


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
            <div className="item logo"><Link to="/"><img src={ `${process.env.PUBLIC_URL}/images/logo.png` } /></Link></div>

            <div className="menu-toggle item activatable"><button className="item" onClick={ toggleMenu }>{ showMenu ? <CgClose className="icon"/> : <CgMenu className="icon"/> }</button></div>
            
            <div className="nav-menu" ref={ navMenuRef }>
                <div className="item activatable"><Link to="/">Home</Link></div>
                <div className="item activatable"><Link to="why-partycipate" >Why Partycipate</Link></div>
                <div className="item activatable"><Link to="docs">Docs</Link></div>
                <div className="item activatable"><Link to="contact">Contact</Link></div>
            </div>
        </div>
    )
}
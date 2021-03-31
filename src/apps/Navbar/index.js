import "./style.css"
import { CgMenu, CgClose } from "react-icons/cg"
import { useEffect, useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Server from "../Server"
import App from "../AppContext"


 export default function Navbar() {
    const navMenuRef = useRef()
    const history    = useHistory()
    const [showMenu, setShowMenu]       = useState(false)
    const [isLoggedIn, setIsLoggedIn]   = useState(false)
    const [isInBackend, setIsInBackend] = useState(false)

    useEffect(() => Server.auth().onAuthStateChanged(user => setIsLoggedIn(user)), [])

    // Set "isInBackend" flas so that some navbar items which are duplicated in sidebar can be hided.
    useEffect(() => {
        const updateNavbar = () => setIsInBackend(App.userIsInBackend())
        updateNavbar()
        history.listen(updateNavbar)
    }, [])

    const toggleMenu = () => {
        setShowMenu(!showMenu)
        navMenuRef.current.classList.toggle("show-menu")
    }
    
    return (
        <div className="navbar">
            <div className="item logo"><Link to="/"><img src={ `${process.env.PUBLIC_URL}/images/logo.png` } /></Link></div>
            <div className="menu-toggle item activatable"><button className="item" onClick={ toggleMenu }>{ showMenu ? <CgClose className="icon"/> : <CgMenu className="icon"/> }</button></div>
            <div className="nav-menu" ref={ navMenuRef }>
                <Link className="item activatable" to="/">Home</Link>
                <Link className="item activatable" to="/why-partycipate" >Why Partycipate</Link>
                <Link className="item activatable" to="/docs">Docs</Link>
                <Link className="item activatable" to="/contact">Contact</Link>
                { !isInBackend && <div className="nb-separator"> | </div> }
                { (isLoggedIn && !isInBackend) && <Link  className="item activatable btn-dark focus-btn" to="/dashboard">Dashboard</Link> }
                { !isLoggedIn && <Link className="item activatable btn-dark focus-btn" to="/signup">Sign Up</Link> }
                { !isLoggedIn && <Link className="item activatable login-btn" to="/login">Login</Link> }
            </div>
        </div>
    )
}
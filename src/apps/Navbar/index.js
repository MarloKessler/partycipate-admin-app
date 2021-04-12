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
    const [isInBackend, setIsInBackend] = useState()

    useEffect(() => Server.auth().onAuthStateChanged(user => setIsLoggedIn(user)), [])

    // Set "isInBackend" flas so that some navbar items which are duplicated in sidebar can be hided.
    useEffect(() => {
        const updateNavbar = () => {
            setShowMenu(false)
            navMenuRef.current.classList.remove("show-menu")
            setIsInBackend(App.userIsInBackend())
        }
        updateNavbar()
        history.listen(updateNavbar)
    }, [])

    const toggleMenu = () => {
        setShowMenu(!showMenu)
        navMenuRef.current.classList.toggle("show-menu")
    }
    
    return (
        <div className="navbar">
            <div className="logo"><Link to="/"><img src={ `${process.env.PUBLIC_URL}/images/logo.png` } alt="Partycipate's logo"/></Link></div>
            <button className="menu-toggle link-dark" onClick={ toggleMenu }>{ showMenu ? <CgClose/> : <CgMenu/> }</button>
            <div className="nav-menu" ref={ navMenuRef }>
                <Link className="link-dark" to="/">Home</Link>
                <Link className="link-dark" to="/why-partycipate" >Why Partycipate</Link>
                <Link className="link-dark" to="/docs">Docs</Link>
                <Link className="link-dark" to="/contact">Contact</Link>
                { isInBackend === false && <div className="nb-separator"> | </div> }
                { (isLoggedIn && !isInBackend) && <Link className="link-button btn-light" to="/dashboard">Dashboard</Link> }
                { isLoggedIn === null && <Link className="link-button btn-light" to="/signup">Sign Up</Link> }
                { isLoggedIn === null && <Link className="link-dark" to="/login">Login</Link> }
            </div>
        </div>
    )
}
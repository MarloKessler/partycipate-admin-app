import "./style.css"
import { useEffect, useState, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { IoIosMore } from "react-icons/io"
import { IoHome, IoCreateOutline, IoStatsChart } from "react-icons/io5"
import { CgClose } from "react-icons/cg"
import Server from "../Server"
import App from "../AppContext"


export default function Sidebar() {
    const history = useHistory()
    const sidebar = useRef()
    const sbMenuRef = useRef()

    // Toggles the sidebar if user switches between frontend and backend.
    useEffect(() => {
        const updateNavbar = () => {
            const sb = sidebar.current
            if (!sb) return
            if (App.userIsInBackend()) {
                if (!sb.classList.contains("show")) sb.classList.add("show")
            } else if (sb.classList.contains("show")) sb.classList.remove("show")

            const sbMR = sbMenuRef.current
            if (!sbMR) return
            if (!App.userIsInBackend() && sbMR.classList.contains("show")) sbMR.classList.remove("show")
        }
        updateNavbar()
        history.listen(updateNavbar)
    }, [])

    const toggleSBMenu = () => sbMenuRef.current.classList.toggle("show")

    const logout = () => Server.auth().logout().catch(() => {})

    return (
        <div className="sidebar secondary-element" ref={sidebar}>
            <div className="sb-toolbar-menu">
                <Link className="link-light sbtm-btn" to="/dashboard"><IoHome/></Link>
                <Link className="link-light sbtm-btn" to="/create-survey"><IoCreateOutline/></Link>
                <Link className="link-light sbtm-btn" to="/surveys"><IoStatsChart/></Link>
                <button className="link-light sbtm-btn" onClick={toggleSBMenu}><IoIosMore/></button>
            </div>
            <div className="sb-menu secondary-element" ref={sbMenuRef}>
                <button className="link-light sbm-close-btn" onClick={toggleSBMenu}><CgClose/></button>
                <Link className="link-light" to="/dashboard" onClick={toggleSBMenu}>My Dashboard</Link>
                <Link className="link-light" to="/create-survey" onClick={toggleSBMenu}>Create Survey</Link>
                <Link className="link-light" to="/surveys" onClick={toggleSBMenu}>View Results</Link>
                <Link className="link-light" to="/my-account" onClick={toggleSBMenu}>My Account</Link>
                <button className="link-light logout" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}
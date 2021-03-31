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
            const sbCl = sidebar.current.classList
            if (!sbCl) return
            if (App.userIsInBackend()) {
                if (!sbCl.contains("show")) sbCl.add("show")
            } else if (sbCl.contains("show")) sbCl.remove("show")

            const sbMRCl = sbMenuRef.current.classList
            if (!sbMRCl) return
            if (!App.userIsInBackend() && sbMRCl.contains("show")) sbMRCl.remove("show")
        }
        updateNavbar()
        history.listen(updateNavbar)
    }, [])

    const toggleSBMenu = () => sbMenuRef.current.classList.toggle("show")

    const logout = () => Server.auth().logout()

    return (
        <div className="sidebar" ref={sidebar}>
            <div className="sb-toolbar-menu">
                <Link className="item sbtm-btn activatable" to="/dashboard"><IoHome/></Link>
                <Link className="item sbtm-btn activatable" to="/create-survey"><IoCreateOutline/></Link>
                <Link className="item sbtm-btn activatable" to="/surveys"><IoStatsChart/></Link>
                <button className="item sbtm-btn activatable" onClick={toggleSBMenu}><IoIosMore/></button>
            </div>
            <div className="sb-menu" ref={sbMenuRef}>
                <button className="item sbm-close-btn activatable" onClick={toggleSBMenu}><CgClose/></button>
                <Link className="item activatable" to="/create-survey" onClick={toggleSBMenu}>Create Survey</Link>
                <Link className="item activatable" to="/surveys" onClick={toggleSBMenu}>View Results</Link>
                <Link className="item activatable" to="/my-account" onClick={toggleSBMenu}>My Account</Link>
                <Link className="item activatable" to="/docs" onClick={toggleSBMenu}>Get Help</Link>
                <button className="item activatable logout" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}
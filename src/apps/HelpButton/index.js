import "./style.css"
import { useHistory } from "react-router"
import { IoHelpOutline } from "react-icons/io5"


export default function HelpButton({ className = "", section: sectionID = "" }) {
    const history = useHistory()
    return (
        <a className={`button item help-button ${className}`} href={`${window.location.origin}/docs/${sectionID}`} target="blank">
            <IoHelpOutline className="hb-icon"/>
        </a>
    )
}
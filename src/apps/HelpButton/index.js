import "./style.css"
import { IoHelpOutline } from "react-icons/io5"


export default function HelpButton({ className = "", section: sectionID = "" }) {
    return (
        <a className={`btn-light help-button ${className}`} href={`${window.location.origin}/docs/${sectionID}`} target="blank">
            <IoHelpOutline/>
        </a>
    )
}
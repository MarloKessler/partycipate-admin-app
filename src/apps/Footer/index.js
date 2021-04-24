import "./style.css"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer>
            <div className="footer-menu">
                <Link className="item activatable" to={process.env.REACT_APP_PATH_HOME}>Home</Link>
                <DividerPoint/>
                <Link className="item activatable" to={process.env.REACT_APP_PATH_WHY_PARTICIPATE}>Why Partycipate</Link>
                <DividerPoint/>
                <Link className="item activatable" to={process.env.REACT_APP_PATH_DOCS}>Docs</Link>
                <DividerPoint/>
                <Link className="item activatable" to={process.env.REACT_APP_PATH_CONTACT}>Contact</Link>
                <DividerPoint/>
                <Link className="item activatable" to={process.env.REACT_APP_PATH_IMPRINT}>Imprint</Link>
                <DividerPoint/>
                <Link className="item activatable" to={process.env.REACT_APP_PATH_PRIVACY_STATEMENT}>Privacy Statement</Link>
            </div>
            <p className="copyright-statement"><Link to={process.env.REACT_APP_PATH_HOME}>Partycipate AG</Link> © { new Date().getFullYear() }</p>
        </footer>
    )
}


const DividerPoint = () => <div className="divider-point"> • </div>
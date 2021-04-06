import "./style.css"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer>
            <div className="footer-menu">
                <Link className="item activatable" to="/">Home</Link>
                <DividerPoint/>
                <Link className="item activatable" to="/why-partycipate" >Why Partycipate</Link>
                <DividerPoint/>
                <Link className="item activatable" to="/docs">Docs</Link>
                <DividerPoint/>
                <Link className="item activatable" to="/contact">Contact</Link>
                <DividerPoint/>
                <Link className="item activatable" to="/imprint">Imprint</Link>
                <DividerPoint/>
                <Link className="item activatable" to="/privacy">Privacy Statement</Link>
            </div>
            <p className="copyright-statement"><Link to="/">Partycipate AG</Link> © { new Date().getFullYear() }</p>
        </footer>
    )
}


const DividerPoint = () => <div className="divider-point"> • </div>
import "./style.css"
import { Link } from "react-router-dom"
import DemoElement from "../DemoElement"
import StandardPage from "../StandardPage"


export default function HomeView(){
  return(
    <div className="home-view">
      <StandardPage containerClassName="hv-column" title={<span>Welcome to Partycipate 🎉 <br/> the easy-to-use, flexible Survey tool!</span>}>
        <p>Build your own survey using our intuitive module kit, embedd it to your website, and view your results in real-time!</p>
        <div className="hv-actionbar">
          <Link className="link-button btn-dark" to={process.env.REACT_APP_PATH_WHY_PARTICIPATE}>Learn more</Link>
          <Link className="link-button btn-dark" to={process.env.REACT_APP_PATH_SIGN_UP}>Register now</Link>
        </div>
      </StandardPage>
      <div className="hv-column">
        <DemoElement/>
      </div>
    </div>
  )
}
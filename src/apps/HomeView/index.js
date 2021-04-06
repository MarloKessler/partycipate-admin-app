import "./style.css"
import { Link } from "react-router-dom"
import PageTitleElement from "../PageTitleElement"
import DemoElement from "../DemoElement"


export default function HomeView(){
  return(
    <div className="home-view">
      <div className="left">
        <PageTitleElement className="pageelement">Welcome to Partycipate 🎉 <br/> the easy-to-use, <br/> flexible Survey tool!</PageTitleElement>
        <p>Build your own survey using our intuitive module kit, embedd it to your website, and view your results in real-time!</p>
        <div>
          <Link className="btn-dark" to="/docs" >Learn more</Link>
          <Link className="btn-dark" to="/signup">Register now</Link>
        </div>
      </div>
      <div>
        <DemoElement/>
      </div>
    </div>
  )
}
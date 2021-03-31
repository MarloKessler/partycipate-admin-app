import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"


export default function HomeView(){
    return(
      <div className="home">
        <div className="left">
          <PageTitleElement className="pageelement">Welcome to Partycipate 🎉 <br/> the easy-to-use, <br/> flexible Survey tool!</PageTitleElement>
          <div className="welcome">Build your own survey using our intuitive module kit, embedd it to your website, and view your results in real-time! <br/> </div>
            <div>
              <Link to="/docs" ><button className="button-learnmore">Learn more</button></Link>
              <Link to="/signup"><button className="button-register">Register now</button></Link>
            </div>
        </div>
        <div className="right">
          <CardElement className="cardelement">Multiple-choice Surveys</CardElement>
          <CardElement className="cardelement">Single-choice Surveys</CardElement>
        </div>
      </div>
    )
  }
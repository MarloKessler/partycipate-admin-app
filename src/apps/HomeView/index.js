import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"


export default function HomeView(){
    return(
      <div className="home">
        <div className="left">
          <PageTitleElement className="pageelement">Welcome to Partycipate 🎉 <br/> the easy-to-use, <br/> flexible Survey tool!</PageTitleElement>
          <p>Build your own survey using our intuitive module kit, embedd it to your website, and view your results in real-time!</p>
          <div>
            <Link className="btn-dark" to="/docs" >Learn more</Link>
            <Link className="btn-dark" to="/signup">Register now</Link>
          </div>
        </div>
        <div className="right">
          <CardElement className="cardelement">Multiple-choice Surveys</CardElement>
          <CardElement className="cardelement">Single-choice Surveys</CardElement>
        </div>
      </div>
    )
  }
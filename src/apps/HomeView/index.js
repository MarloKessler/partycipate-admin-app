import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"


export default function HomeView(){
    return(
      <div className="home">
        <div className="left">
          <PageTitleElement className="pageelement">Welcome to Partycipate 🎉 <br/> the easy-to-use, <br/> flexible survey tool!</PageTitleElement>
          <p>Build your own survey using our intuitive module kit, embedd it to your website, and view your results in real-time!</p>
          <div>
            <Link className="btn-dark" to="/docs" >Learn more</Link>
            <Link className="btn-dark" to="/signup">Register now</Link>
          </div>
        </div>
        <div className="right">
          <CardElement className="cardelement">
            <span>Multiple-choice Surveys</span>
            <div className="ce-separator"/>
            <img src={`${process.env.PUBLIC_URL}/images/Balkendiagramm.png`}/>
          </CardElement>
          <CardElement className="cardelement">
            <span>Single-choice Surveys</span>
            <div className="ce-separator"/>
            <img src={`${process.env.PUBLIC_URL}/images/Kreisdiagramm.png`}/>
          </CardElement>
        </div>
      </div>
    )
  }
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
          <CardElement className="cardelement">
            <span>Multiple-choice Surveys</span>
              <div className="ce-separator"/>
            <img src={`${process.env.PUBLIC_URL}/images/Balkendiagramm.png`}/>
          </CardElement>
          <CardElement className="cardelement"><img src={`${process.env.PUBLIC_URL}/images/Kreisdiagramm.png`}/>Single-choice Surveys</CardElement>
        </div>
      </div>
    )
  }
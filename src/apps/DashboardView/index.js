import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"


export default function DashboardView(){
  return(
    <div className="tp">
      <PageTitleElement>Welcome back, Partycipant!🎉</PageTitleElement>
      <p className="hello">What do you want to do today?</p>
        <div className="carts">
          <Link to="/create-survey" ><CardElement className='FirstBox'> Create a new survey </CardElement> </Link>
          <Link to="/surveys"><CardElement className='FirstBox'>View results of your surveys</CardElement></Link>
          <Link to="/my-account"><CardElement className='SecondBox'>Change settings of your account</CardElement></Link>
          <Link to="/docs"><CardElement className='SecondBox'>Docs</CardElement></Link>
        </div>
    </div>
  )
}
  
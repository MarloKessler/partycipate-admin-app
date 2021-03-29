import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"


export default function DashboardView(){
  return(
    <div className="dashbard-view">
      <PageTitleElement>Welcome back, Partycipant!🎉</PageTitleElement>
      <p className="hello">What do you want to do today?</p>
      <div className="dv-cards">
        <Link className='dv-item' to="/create-survey" ><CardElement> Create a brandnew Survey ❔</CardElement></Link>
        <Link className='dv-item' to="/surveys"><CardElement>View Results of your Surveys 📊</CardElement></Link>
        <Link className='dv-item' to="/my-account"><CardElement>Change Settings of your Account 🙂</CardElement></Link>
        <Link className='dv-item' to="/docs"><CardElement>Get Help in our FAQs 🤝</CardElement></Link>
      </div>
    </div>
  )
}

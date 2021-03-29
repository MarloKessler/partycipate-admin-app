import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"


export default function DashboardView(){
  return(
    <div className="dashboard-view">
      <PageTitleElement>Welcome back, Partycipant!🎉</PageTitleElement>
      <div className="hello">What do you want to do today?</div>
      <div className="dv-cards">
        <Link className='dv-item' to="/create-survey" ><CardElement className="element"> Create a brandnew Survey ❔</CardElement></Link>
        <Link className='dv-item' to="/surveys"><CardElement className="element">View Results of your Surveys 📊</CardElement></Link>
        <Link className='dv-item' to="/my-account"><CardElement className="element">Change Settings of your Account 🙂</CardElement></Link>
        <Link className='dv-item' to="/docs"><CardElement className="element">Get Help in our FAQs 🤝</CardElement></Link>
      </div>
    </div>
  )
}

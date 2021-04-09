import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"
import StandardPage from "../StandardPage"


export default function DashboardView(){
  return(
    <StandardPage className="dashboard-view" title="Welcome back, Partycipant!🎉">
      <p>What do you want to do today?</p>
      <div className="dv-cards">
        <CardElement className="secondary-element link-light dv-card"><Link to="/create-survey" >Create a brandnew Survey ❔</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to="/surveys">View Results of your Surveys 📊</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to="/my-account">Change Settings of your Account 🙂</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to="/docs">Get Help in our FAQs 🤝</Link></CardElement>
      </div>
    </StandardPage>
  )
}

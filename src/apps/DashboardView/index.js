import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"
import StandardPage from "../StandardPage"
import CrossSurveyResultsCard from "../CrossSurveyResultsCard"


export default function DashboardView(){
  return(
    <StandardPage className="dashboard-view" title="Welcome back, Partycipant!🎉">
      <p>What do you want to do today?</p>
      <div className="dv-cards">
        <CrossSurveyResultsCard className="dv-card"/>
        <CardElement className="secondary-element link-light dv-card"><Link to="/create-survey" >Create a brandnew survey ❔</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to="/surveys">View results of your surveys 📊</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to="/my-account">Change settings of your account 🙂</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to="/docs">Get help in our FAQs 🤝</Link></CardElement>
      </div>
    </StandardPage>
  )
}

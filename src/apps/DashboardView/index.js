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
        <CardElement className="secondary-element link-light dv-card"><Link to={process.env.REACT_APP_PATH_CREATE_SURVEY} >Create a brandnew survey ❔</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to={process.env.REACT_APP_PATH_SURVEY_OVERVIEW}>View results of your surveys 📊</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to={process.env.REACT_APP_PATH_ACCOUNT_VIEW}>Change settings of your account 🙂</Link></CardElement>
        <CardElement className="secondary-element link-light dv-card"><Link to={process.env.REACT_APP_PATH_DOCS}>Get help in our FAQs 🤝</Link></CardElement>
      </div>
    </StandardPage>
  )
}

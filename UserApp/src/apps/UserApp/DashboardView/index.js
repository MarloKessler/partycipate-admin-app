import "./style.css"
import { Link } from "react-router-dom"
import { CardElement, StandardPage } from "../../utilElements"
import CrossSurveyResultsCard from "./CrossSurveyResultsCard"
import { useMemo } from "react"
import Server from "../../Server"


export function DashboardView() {
  const participantName = useMemo(() => Server.auth().currentUser().name, [])
  return(
    <StandardPage className="dashboard-view" title={`Welcome back, ${participantName || "Partycipant"}!🎉`}>
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

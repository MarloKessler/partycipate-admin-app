import './style.css'
import { Switch, Route } from "react-router-dom"

// Views
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import ErrorPage from "../ErrorPage"
import CreateSurveyView from "../CreateSurveyView"
import SurveyOverview from "../SurveyOverview"
import ResultsView from "../ResultsView"
import GetHelpView from "../GetHelpView"
import HomePage from "../HomePage"
import LogoutView from "../LogoutView"
import LoginView from "../LoginView"
import SignupView from "../SignupView"
import AccountView from "../AccountView"


export default function Main() {  
  return (
    <div className="App">
        <Navbar/>
          <div className="Admin-App">
            <Sidebar/>
            <div className="Page-Container">
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/create-survey" component={ CreateSurveyView }/>
              <Route exact path="/surveys" component={SurveyOverview}/>
              <Route exact path="/surveys/:id" component={ResultsView}/>
              <Route exact path="/my-account" component={AccountView}/>
              <Route exact path="/get-help" component={GetHelpView}/>
              <Route exact path="/get-help/:id" component={GetHelpView}/>
              <Route exact path="/why-partycipate" component={WhyPartycipatePage}/>
              <Route exact path="/contact" component={ContactPage}/>
              <Route exact path="/logout" component={LogoutView}/>
              <Route exact path="/login" component={LoginView}/>
              <Route exact path="/signup" component={SignupView}/>
              <Route path="*" component={ () => <ErrorPage message="The page you’re looking for can’t be found."/> }/>
            </Switch>
            </div>
          </div>
    </div>
  )
}


function WhyPartycipatePage(){
  return(
  <p>WhyPartycipatePage</p>
  )
}

function ContactPage(){
  return(
  <p>Contact</p>
  )
}
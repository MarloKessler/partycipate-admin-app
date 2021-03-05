import './style.css'
import { Switch, Route } from "react-router-dom"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import ErrorPage from "../ErrorPage"
import CardElement from "../CardElement"
import PageTitleElement from "../PageTitleElement"
import CreateSurveyPage from "../EditSurveyElements/CreateSurveyPage"


export default Main


function Main() {
  return (
    <div className="App">
        <Navbar/>
        <div className="Content">
          <Sidebar/>
          <div className="Page-Container">
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/create-survey" component={ CreateSurveyPage }/>
              <Route path="/view-results" component={ViewResultsPage}/>
              <Route path="/my-account" component={MyAccountPage}/>
              <Route path="/get-help" compoenent={GetHelpPage}/>
              <Route path="/why-partycipate" component={WhyPartycipatePage}/>
              <Route path="/surveys" component={SurveysPage}/>
              <Route path="/contact" component={ContactPage}/>
              <Route path="*" component={ () => <ErrorPage message="The page you’re looking for can’t be found."/> }/>
            </Switch>
            <PageTitleElement>Titel Startseite</PageTitleElement>
            <CardElement>Create a new survey</CardElement>
          </div>
        </div>
    </div>
  )
}

function HomePage(){
  return(
  <p>Homepage</p>
  )
}

function ViewResultsPage(){
  return(
  <p>ViewResultsPage</p>
  )
}

function MyAccountPage(){
  return(
  <p>MyAccountPage</p>
  )
}

function GetHelpPage(){
  return(
  <p>GetHelpPage</p>
  )
}

function WhyPartycipatePage(){
  return(
  <p>WhyPartycipatePage</p>
  )
}

function SurveysPage(){
  return(
  <p>SurveysPage</p>
  )
}

function ContactPage(){
  return(
  <p>Contact</p>
  )
}
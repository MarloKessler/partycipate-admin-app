import './style.css'
import { Switch, Route } from "react-router-dom"

// Views
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import ErrorPage from "../ErrorPage"
import CreateSurveyView from "../CreateSurveyView"
import SurveyOverview from "../SurveyOverview"


export default Main


function Main() {
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
              <Route exact path="/surveys/:id" component={ViewResultsPage }/>
              <Route exact path="/my-account" component={MyAccountPage}/>
              <Route exact path="/get-help" compoenent={GetHelpPage}/>
              <Route exact path="/why-partycipate" component={WhyPartycipatePage}/>
              <Route exact path="/contact" component={ContactPage}/>
              <Route path="*" component={ () => <ErrorPage message="The page you’re looking for can’t be found."/> }/>
            </Switch>
            </div>
          </div>
    </div>
  )
}

/*
<div className="Content">
  <Sidebar/>
  <div className="Page-Container">
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/create-survey" component={ CreateSurveyView }/>
      <Route exact path="/surveys" component={SurveysPage}/>
      <Route exact path="/surveys/:id" component={ViewResultsPage }/>
      <Route exact path="/my-account" component={MyAccountPage}/>
      <Route exact path="/get-help" compoenent={GetHelpPage}/>
      <Route exact path="/why-partycipate" component={WhyPartycipatePage}/>
      <Route exact path="/contact" component={ContactPage}/>
      <Route path="*" component={ () => <ErrorPage message="The page you’re looking for can’t be found."/> }/>
    </Switch>
  </div>
</div>
*/

function HomePage(){
  return(
    <div className="tp">HomePage</div>
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

function ContactPage(){
  return(
  <p>Contact</p>
  )
}
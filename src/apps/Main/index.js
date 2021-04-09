import './style.css'
import { useEffect, useState } from 'react'
import { Switch, Route, useHistory, Redirect } from "react-router-dom"
import Server from "../Server"

// Views
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import Footer from "../Footer"
import ErrorPage from "../ErrorPage"
import CreateSurveyView from "../CreateSurveyView"
import SurveyOverview from "../SurveyOverview"
import ResultsView from "../ResultsView"
import DocsView from "../DocsView"
import DashboardView from "../DashboardView"
import LogoutView from "../LogoutView"
import LoginView from "../LoginView"
import SignupView from "../SignupView"
import AccountView from "../AccountView"
import HomeView from "../HomeView"
import ContactView from "../ContactView"
import WhyPartycipateView from "../WhyPartycipateView"
import ImprintView from "../ImprintView"
import PrivacyStatementView from "../PrivacyStatementView"


export default function Main() {
  const [ user, setUser ] = useState()
  const history = useHistory()
  useEffect(() => Server.auth().onAuthStateChanged((newUser, oldUser) => {
    if (oldUser && !newUser) history.push("/logout")
    setUser(newUser)
  }), [])

  useEffect(() => setTimeout(Server.auth().init(), 5000), [])

  return (
    <div className="App">
        <Navbar/>
          <div className="Admin-App">
            { user && <Sidebar/> }
            <div className="Page-Container">
              { user !== undefined &&
                <Switch>
                  <SecureRoute exact path="/dashboard" component={<DashboardView/>}/>
                  <SecureRoute exact path="/create-survey" component={<CreateSurveyView/>}/>
                  <SecureRoute exact path="/surveys" component={<SurveyOverview/>}/>
                  <SecureRoute exact path="/surveys/:id" component={<ResultsView/>}/>
                  <SecureRoute exact path="/my-account" component={<AccountView/>}/>
                  <AuthRoute exact path="/logout" component={<LogoutView/>}/>
                  <AuthRoute exact path="/signup" component={<SignupView/>}/>
                  <AuthRoute exact path="/login" component={<LoginView/>}/>
                  <Route exact path="/" component={HomeView}/>
                  <Route exact path="/why-partycipate" component={WhyPartycipateView}/>
                  <Route exact path="/docs" component={DocsView}/>
                  <Route exact path="/docs/:id" component={DocsView}/>
                  <Route exact path="/contact" component={ContactView}/>
                  <Route exact path="/imprint" component={ImprintView}/>
                  <Route exact path="/privacy" component={PrivacyStatementView}/>
                  <Route path="*" component={ () => <ErrorPage message="The page you’re looking for can’t be found."/> }/>
                </Switch>
              }
              <Footer/>
            </div>
          </div>
    </div>
  )
}


function SecureRoute({ exact, path, component }) {
  const history = useHistory()
  const user = Server.auth().currentUser()
  return (
    <Route exact={exact} path={path}>
      { user ? component : <Redirect to={{pathname: "/login", search: `red=${window.location.pathname}`, state: history.location.state }}/> }
    </Route>
  )
}


function AuthRoute({ exact, path, component }) {
  const user = Server.auth().currentUser()
  return (
    <Route exact={exact} path={path}>
      { user ? <Redirect to="dashboard"/> : component }
    </Route>
  )
}

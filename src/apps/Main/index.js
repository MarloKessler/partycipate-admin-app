import './style.css'
import { useEffect, useRef, useState } from 'react'
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom"
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
  const pageContainerRef = useRef()

  useEffect(() => Server.init(), [])

  useEffect(() => Server.auth().onAuthStateChanged((newUser, oldUser) => {
    if (oldUser && !newUser) history.push("/logout")
    setUser(newUser)
  }), [])

  useEffect(() => history.listen(location => {
      // Keep default behavior of restoring scroll position when the user goes back
      if (history.action === 'POP') return
      // In all other cases, scroll to the top
      pageContainerRef.current.scrollTo(0, 0)
    }), [])

  return (
    <div className="App">
        <Navbar/>
          <div className="Admin-App">
            { user && <Sidebar/> }
            <div className="Page-Container" ref={pageContainerRef}>
              { user !== undefined &&
                <Switch>
                  <SecureRoute user={user} exact path="/dashboard" component={DashboardView}/>
                  <SecureRoute user={user} exact path="/create-survey" component={CreateSurveyView}/>
                  <SecureRoute user={user} exact path="/surveys" component={SurveyOverview}/>
                  <SecureRoute user={user} exact path="/surveys/:id" component={ResultsView}/>
                  <SecureRoute user={user} exact path="/my-account" component={AccountView}/>
                  <AuthRoute user={user} exact path="/logout" component={LogoutView}/>
                  <AuthRoute user={user} exact path="/signup" component={SignupView}/>
                  <AuthRoute user={user} exact path="/login" component={LoginView}/>
                  <Route exact path="/" component={HomeView}/>
                  <Route exact path="/why-partycipate" component={WhyPartycipateView}/>
                  <Route exact path="/docs" component={DocsView}/>
                  <Route exact path="/docs/:id" component={DocsView}/>
                  <Route exact path="/contact" component={ContactView}/>
                  <Route exact path="/imprint" component={ImprintView}/>
                  <Route exact path="/privacy" component={PrivacyStatementView}/>
                  <Route path="*" component={() => <ErrorPage message="The page you’re looking for can’t be found."/>}/>
                </Switch>
              }
              <Footer/>
            </div>
          </div>
    </div>
  )
}


function SecureRoute({ user, exact, path, component }) {
  const history = useHistory()
  return user ? <Route exact={exact} path={path} component={component}/> : <Redirect exact={exact} path={path} to={{pathname: "/login", search: `red=${window.location.pathname}`, state: history.location.state }}/>
}


function AuthRoute({ user, exact, path, component }) {
  const redirectPath = new URLSearchParams(useLocation().search).get("red")
  return user ? <Redirect exact={exact} path={path} to={redirectPath || "/dashboard"}/> : <Route exact={exact} path={path} component={component}/>
}

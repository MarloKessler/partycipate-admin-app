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
                  <SecureRoute user={user} exact path={process.env.REACT_APP_PATH_DASHBOARD} component={DashboardView}/>
                  <SecureRoute user={user} exact path={process.env.REACT_APP_PATH_CREATE_SURVEY} component={CreateSurveyView}/>
                  <SecureRoute user={user} exact path={process.env.REACT_APP_PATH_SURVEY_OVERVIEW} component={SurveyOverview}/>
                  <SecureRoute user={user} exact path={`${process.env.REACT_APP_PATH_SURVEY_OVERVIEW}/:id`} component={ResultsView}/>
                  <SecureRoute user={user} exact path={process.env.REACT_APP_PATH_ACCOUNT_VIEW} component={AccountView}/>
                  <AuthRoute user={user} exact path={process.env.REACT_APP_PATH_LOGOUT} component={LogoutView}/>
                  <AuthRoute user={user} exact path={process.env.REACT_APP_PATH_SIGN_UP} component={SignupView}/>
                  <AuthRoute user={user} exact path={process.env.REACT_APP_PATH_LOGIN} component={LoginView}/>
                  <Route exact path={process.env.REACT_APP_PATH_HOME} component={HomeView}/>
                  <Route exact path={process.env.REACT_APP_PATH_WHY_PARTICIPATE} component={WhyPartycipateView}/>
                  <Route exact path={process.env.REACT_APP_PATH_DOCS} component={DocsView}/>
                  <Route exact path={`${process.env.REACT_APP_PATH_DOCS}:id`} component={DocsView}/>
                  <Route exact path={process.env.REACT_APP_PATH_CONTACT} component={ContactView}/>
                  <Route exact path={process.env.REACT_APP_PATH_IMPRINT} component={ImprintView}/>
                  <Route exact path={process.env.REACT_APP_PATH_PRIVACY_STATEMENT} component={PrivacyStatementView}/>
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
  return user ? <Route exact={exact} path={path} component={component}/> : <Redirect exact={exact} path={path} to={{pathname: process.env.REACT_APP_PATH_LOGIN, search: `red=${window.location.pathname}`, state: history.location.state }}/>
}


function AuthRoute({ user, exact, path, component }) {
  const redirectPath = new URLSearchParams(useLocation().search).get("red")
  return user ? <Redirect exact={exact} path={path} to={redirectPath || process.env.REACT_APP_PATH_DASHBOARD}/> : <Route exact={exact} path={path} component={component}/>
}

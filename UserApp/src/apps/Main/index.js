import './style.css'
import { useEffect, useRef, useState } from 'react'
import { Switch, Route, useHistory, Redirect, useLocation } from "react-router-dom"
import Server from "../Server"
import { ErrorPage } from "../utilElements"

// Views
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import { HomeView, WhyPartycipateView, DocsView, ContactView } from "../PublicApp"
import { DashboardView, CreateSurveyView, SurveyOverview, ResultsView, AccountView } from "../UserApp"
import { ImprintView, PrivacyStatementView } from "../Legal"
import { SignupView, LoginView, LogoutView} from "../AuthApp"
import { AdminUserOverview, AdminUserView} from "../AdminApp"


export default function Main() {
  const [ user, setUser ] = useState()
  const history = useHistory()
  const pageContainerRef = useRef()

  useEffect(() => Server.init(), [])

  useEffect(() => Server.auth().onAuthStateChanged((newUser, oldUser) => {
    setUser(newUser)
    if (oldUser && !newUser) history.push("/logout")
  }), [])

  useEffect(() => history.listen(() => {
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
                  <Route exact path={process.env.REACT_APP_PATH_HOME} component={HomeView}/>
                  <Route exact path={process.env.REACT_APP_PATH_WHY_PARTICIPATE} component={WhyPartycipateView}/>
                  <Route exact path={process.env.REACT_APP_PATH_DOCS} component={DocsView}/>
                  <Route exact path={`${process.env.REACT_APP_PATH_DOCS}/:id`} component={DocsView}/>
                  <Route exact path={process.env.REACT_APP_PATH_CONTACT} component={ContactView}/>
                  <Route exact path={process.env.REACT_APP_PATH_IMPRINT} component={ImprintView}/>
                  <Route exact path={process.env.REACT_APP_PATH_PRIVACY_STATEMENT} component={PrivacyStatementView}/>

                  <AuthRoute user={user} exact path={process.env.REACT_APP_PATH_LOGOUT} component={LogoutView}/>
                  <AuthRoute user={user} exact path={process.env.REACT_APP_PATH_SIGN_UP} component={SignupView}/>
                  <AuthRoute user={user} exact path={process.env.REACT_APP_PATH_LOGIN} component={LoginView}/>

                  <SecureRoute user={user} exact path={process.env.REACT_APP_PATH_DASHBOARD} component={DashboardView}/>
                  <SecureRoute user={user} exact path={process.env.REACT_APP_PATH_CREATE_SURVEY} component={CreateSurveyView}/>
                  <SecureRoute user={user} exact path={process.env.REACT_APP_PATH_SURVEY_OVERVIEW} component={SurveyOverview}/>
                  <SecureRoute user={user} exact path={`${process.env.REACT_APP_PATH_SURVEY_OVERVIEW}/:id`} component={ResultsView}/>
                  <SecureRoute user={user} exact path={process.env.REACT_APP_PATH_ACCOUNT_VIEW} component={AccountView}/>

                  <AdminRoute user={user} exact path={process.env.REACT_APP_PATH_USERS_OVERVIEW} component={AdminUserOverview}/>
                  <AdminRoute user={user} exact path={`${process.env.REACT_APP_PATH_USERS_OVERVIEW}/:userID`} component={AdminUserView}/>
                  
                  <Route path="*" component={Page404}/>
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


function AdminRoute({ user, exact, path, component }) {
  const userIsAdmin = () => user && Server.admin().userIsAdmin(user)
  return userIsAdmin() ? <Route exact={exact} path={path} component={component}/> : <Page404/>
}


function AuthRoute({ user, exact, path, component }) {
  const redirectPath = new URLSearchParams(useLocation().search).get("red")
  return user ? <Redirect exact={exact} path={path} to={redirectPath || process.env.REACT_APP_PATH_DASHBOARD}/> : <Route exact={exact} path={path} component={component}/>
}

const Page404 = () => <ErrorPage message="The page you’re looking for can’t be found."/>

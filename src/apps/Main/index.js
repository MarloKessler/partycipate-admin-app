import './style.css'
import { Switch, Route } from "react-router-dom"
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import ErrorPage from "../ErrorPage"
import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"


export default Main


function Main() {
  return (
    <div className="App">
        <Navbar/>
        <div className="Content">
          <Sidebar/>
          <div className="Page-Container">
            <Switch>
              <Route exact path="/" component={ PageTitleElement }/>
              <Route exact path="/" component={ CreateSurveyView }/>
              <Route path="*" component={ () => <ErrorPage message="The page you’re looking for can’t be found."/> }/>
            </Switch>
            <CardElement/>
          </div>
        </div>
    </div>
  )
}


function CreateSurveyView() {
  return <div>Create Survey View</div>
}
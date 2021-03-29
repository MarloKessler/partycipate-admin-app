import "./style.css"
import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"


export default function LogoutView() {
  const history = useHistory()
  // Sets a timer so that after 5 seconds the user is redirected to the home page.
  useEffect(() => {
    const timeoutID = setTimeout(() => history.push("/"), 5000)
    return () => clearTimeout(timeoutID)
  }, [history])

  return(
    <div className="logout">
      <PageTitleElement>Thank you, Partycipant!🎉</PageTitleElement>
      <div className="bye">You have successfully logged out and you can leave this page now.</div>
      <div className="logout-body">
        <CardElement className="logoutBox"> 
          <div>We hope to see you back soon on</div>
          <Link to="/" >
            <div className="item logo">
                <img src={ `${process.env.PUBLIC_URL}/images/logo.png` } />
            </div>
          </Link>
        </CardElement> 
      </div>
    </div>
  )
}
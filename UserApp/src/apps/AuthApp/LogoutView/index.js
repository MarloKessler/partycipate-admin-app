import "./style.css"
import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { CardElement, StandardPage } from "../../utilElements"


export function LogoutView() {
  const history = useHistory()

  // Sets a timer so that after 5 seconds the user is redirected to the home page.
  useEffect(() => {
    const timeoutID = setTimeout(() => history.push("/"), 5000)
    return () => clearTimeout(timeoutID)
  }, [history])

  return(
    <StandardPage className="logout-view" title="Thank you, Partycipant!🎉">
      <p>You have successfully logged out and you can leave this page now.</p>
      <div className="lv-body">
        <CardElement className="primary-element lv-card"> 
          <p>We hope to see you back soon on</p>
          <Link to={process.env.REACT_APP_PATH_HOME}><img src={ `${process.env.PUBLIC_URL}/images/logo.png` }/></Link>
        </CardElement> 
      </div>
    </StandardPage>
  )
}
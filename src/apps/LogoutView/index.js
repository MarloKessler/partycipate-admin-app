import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { Link } from "react-router-dom"



function LogoutView(){
    return(
      <div className="logout">
        <PageTitleElement>Thank you, Partycipant!🎉</PageTitleElement>
        <div className="bye">You have successfully logged out and you can leave this page now.</div>
          <div className="logout-body">
                  <CardElement className="logoutBox"> 
                    <div>We hope to see you back soon on</div>
                  <Link to="/" >
                    <div className="item logo">
                        <a href={ `${process.env.REACT_APP_WEBSITE_URL}/` }>
                            <img src={ `${process.env.PUBLIC_URL}/images/logo.png` } />
                        </a>
                    </div>
                    </Link>
                  </CardElement> 
          </div>
      </div>
    )
  }

  export default LogoutView
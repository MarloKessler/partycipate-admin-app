import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { Link } from "react-router-dom"



function LogoutView(){
    return(
      <div className="logout">
        <PageTitleElement>Thank you, Partycipant!🎉</PageTitleElement>
        <p className="bye">You have successfully logged out and you can leave this page now.</p>
          <div>
                  <CardElement className='logoutBox'> 
                  We hope to see you back soon on 
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
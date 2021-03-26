import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { Link } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"


export default function LoginView(){
  return(
    <div className="login">
      <PageTitleElement className="loginHeader">Log in to your existing account! 🎉</PageTitleElement>
      <div className="login-body"> 
        <CardElement className="celement">
          <PageTitleElement className="Log-in"><a>Log-in</a></PageTitleElement>
          <label for="uname" className="labelUN"><b>E-Mail:</b></label><br/>
          <input className="un " align="center" type="text" placeholder="Enter E-Mail" name="uname" required></input>
          <br/>
          <br/>
          <label for="psw" className="labelPass"><b>Password:</b></label><br/>
          <input className="pass" align="center" type="password" placeholder="Enter Password" name="psw" required></input>
          <Link to="/">
        <div className="toolbar">
          <button className="button btn-dark" type="submit">Login<FiChevronRight/></button>
        </div>
      </Link>
        </CardElement>  
      </div>

    </div>
  )
}
  
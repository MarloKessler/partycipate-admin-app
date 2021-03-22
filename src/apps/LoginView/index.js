import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { Link } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"


function LoginView(){
    return(
      <div className="login">
        <PageTitleElement>Log in to your existing account! 🎉</PageTitleElement>
          <div>
                <CardElement>
                    <PageTitleElement className="Log-in"><a>Log-in</a></PageTitleElement>
                    <label for="uname" className="labelUN"><b>E-Mail:</b></label><br/>
                    <input  class="un " align="center" type="text" placeholder="Enter E-Mail" name="uname" required></input>
                    <br/>
                    <br/>
                    <label for="psw" className="labelPass"><b>Password:</b></label><br/>
                    <input class="pass" align="center" type="password" placeholder="Enter Password" name="psw" required></input>
                </CardElement>  
          </div>
            <Link to="/">
                <div className="toobar">
                <button className="button btn-dark" type="submit">Login<FiChevronRight/></button>
                </div>
            </Link>
      </div>
    )
  }

  
  export default LoginView


  
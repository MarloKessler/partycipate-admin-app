import "./style.css"
import { useState } from "react"
import { FiChevronRight } from "react-icons/fi"
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"


export default function LoginView() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(event) {
    event.preventDefault()
    Server.auth().login(email, password)
    .catch(() => {})
  }

  const setValueVia = setter => event => setter(event.target.value)

  return(
    <div className="login">
      <PageTitleElement className="loginHeader">Log in to your existing account! 🎉</PageTitleElement>
      <div className="login-body"> 
        <CardElement className="celement">
          <form onSubmit={handleLogin}>
            <PageTitleElement className="Log-in"><a>Log-in</a></PageTitleElement>
            <label htmlFor="uname" className="labelUN"><b>E-Mail:</b></label><br/>
            <input type="email" placeholder="Enter E-Mail" name="uname" value={email} required onChange={setValueVia(setEmail)}/>
            <br/>
            <br/>
            <label htmlFor="psw" className="labelUN"><b>Password:</b></label><br/>
            <input type="password" placeholder="Enter Password" name="psw" value={password} required onChange={setValueVia(setPassword)}/>
            <div className="toolbar">
              <button className="button btn-dark" type="submit">Login<FiChevronRight/></button>
            </div>
          </form>
        </CardElement>  
      </div>
    </div>
  )
}
  
import "./style.css"
import { useState } from "react"
import { FiChevronRight } from "react-icons/fi"
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"
import StandardPage from "../StandardPage"
import CardElement from "../CardElement"


export default function LoginView() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const LoginError = {
    emailError: "emailError",
    passwordError: "passwordError",
    unknownError: "unknownError",
  }

  function handleLogin(event) {
    event.preventDefault()
    Server.auth().login(email, password)
    .catch((error) => {setError(LoginError.emailError)})
    //Server.auth().login(password)
    //.catch((error) => {setError(LoginError.passwordError)})
    }


  const setValueVia = setter => event => setter(event.target.value)

  return(
    <StandardPage className="login-view" title="Log in to your existing account! 🎉">
      <CardElement className="primary-element login-card">
        <form onSubmit={handleLogin}>
          <PageTitleElement className="login-title">Log-in</PageTitleElement>
          <label htmlFor="uname">E-Mail:</label>
          <input type="email" placeholder="Enter E-Mail" name="uname" value={email} required onChange={setValueVia(setEmail)}/>

          { error === LoginError.emailError && <small>E-mail is not registered.</small> }

          <label htmlFor="psw">Password:</label>
          <input type="password" placeholder="Enter Password" name="psw" value={password} required onChange={setValueVia(setPassword)}/>

          { error === LoginError.passwordError && <small>Password is incorrect.</small> }

          <div className="toolbar">
            <button className="btn-dark btn-icon-right" type="submit">Login<FiChevronRight/></button>
          </div>
        </form>
      </CardElement>  
    </StandardPage>
  )
}
  
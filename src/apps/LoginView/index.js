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
  const [errors, setErrors] = useState(false)

  const LoginError = {
    emailError : "emailError",
    passwordError : "passwordError",
    unknownError : "unknownError"
  }

  function handleLogin(event) {
    event.preventDefault()
    Server.auth().login(email, password)
    .catch((errors) => {
      const errorArray = []
      switch(errors.message) {
        case LoginError.emailError : errorArray.push(LoginError.emailError)
        case LoginError.passwordError : errorArray.push(LoginError.passwordError)
        break
        default : errorArray.push(LoginError.unknownError)
      }
      setErrors(errorArray)
    })
    }

  const setValueVia = setter => event => setter(event.target.value)

  return(
    <StandardPage className="login-view" title="Log in to your existing account! 🎉">
      <CardElement className="primary-element login-card">
        <form onSubmit={handleLogin}>
          <PageTitleElement className="login-title">Log-in</PageTitleElement>
          <label htmlFor="uname">E-Mail:</label>
          <input type="email" placeholder="Enter E-Mail" name="uname" value={email} required onChange={setValueVia(setEmail)}/>
          { (Array.isArray(errors) && errors.includes(LoginError.emailError)) && <small className="errormessage">Your E-mail could not be found. Please try again!</small> }

          <label htmlFor="psw">Password:</label>
          <input type="password" placeholder="Enter Password" name="psw" value={password} required onChange={setValueVia(setPassword)}/>
          
          { (Array.isArray(errors) && errors.includes(LoginError.passwordError))  && <small className="errormessage">Your Password was incorrect. Please try again!</small> }
          { (Array.isArray(errors) && errors.includes(LoginError.unknownError)) && <small className="errormessage">You couldn't get logged in. Please try again!</small> }

          <div className="toolbar">
            <button className="btn-dark btn-icon-right" type="submit">Login<FiChevronRight/></button>
          </div>
        </form>
      </CardElement>  
    </StandardPage>
  )
}
  
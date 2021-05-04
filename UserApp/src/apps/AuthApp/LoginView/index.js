import "./style.css"
import { useState } from "react"
import { FiChevronRight } from "react-icons/fi"
import Server from "../../Server"
import { TitleElement, CardElement, StandardPage } from "../../utilElements"


export function LoginView() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState(false)

  const LoginError = {
    emailNotRegistered : "emailNotRegistered",
    wrongPassword : "wrongPassword",
    unknownError : "unknownError"
  }

  function handleLogin(event) {
    event.preventDefault()
    Server.auth().login(email, password)
    .catch(error => {
      const errorArray = []
      switch(error.message) {
        case LoginError.emailNotRegistered : errorArray.push(LoginError.emailNotRegistered)
        case LoginError.wrongPassword : errorArray.push(LoginError.wrongPassword)
        break
        default : errorArray.push(LoginError.unknownError)
      }
      setErrors(errorArray)
    })
  }

  const errorOccured = error => Array.isArray(errors) && errors.includes(error)

  const setValueVia = setter => event => setter(event.target.value)

  return(
    <StandardPage className="login-view" title="Log in to your existing account! 🎉">
      <CardElement className="primary-element login-card">
        <form onSubmit={handleLogin} noValidate>
          <TitleElement className="login-title">Log-in</TitleElement>
          <label htmlFor="uname">E-Mail:</label>
          <input type="email" placeholder="Enter E-Mail" name="uname" value={email} onChange={setValueVia(setEmail)}/>
          { errorOccured(LoginError.emailNotRegistered) && <small className="errormessage">Your E-mail could not be found. Please try again!</small> }

          <label htmlFor="psw">Password:</label>
          <input type="password" placeholder="Enter Password" name="psw" value={password} onChange={setValueVia(setPassword)}/>
          { errorOccured(LoginError.wrongPassword)  && <small className="error">Your Password was incorrect. Please try again!</small> }
          { errorOccured(LoginError.unknownError) && <small className="error">You couldn't get logged in. Please try again!</small> }
          
          <button className="btn-dark btn-icon-right" type="submit">Login<FiChevronRight/></button>
        </form>
      </CardElement>  
    </StandardPage>
  )
}
  
import "./style.css"
import { useState } from 'react'
import { Link } from "react-router-dom"
import { CardElement, StandardPage, TitleElement } from "../../utilElements"
import Server from "../../Server"
import { FiChevronRight } from "react-icons/fi"
import Checkbox from '@material-ui/core/Checkbox'



export function SignupView() {
  const [name, setName]           = useState("")
  const [email, setEmail]         = useState("")
  const [password1, setPassword1]   = useState("")
  const [password2, setPassword2]   = useState("")
  const [acceptTAC, setAcceptTAC] = useState(false)

  const [errors, setErrors] = useState(false)

  const SignupError = {
    emailAlreadyInUse : "emailAlreadyInUse",
    emailNotValid : "emailNotValid",
    nameIsEmpty : "nameIsEmpty",
    passwordsIsInvalid : "passwordsIsInvalid",
    passwordsAreUnequal : "passwordsAreUnequal",
    notAcceptedTAC : "notCheckedTAC",
    unknown : "unknown",
  }


  function handleSignup(event) {
    event.preventDefault()
    if (!formIsValid()) return
    Server.auth().signup(email, password1, name)
    .then(() => setErrors(undefined))
    .catch((errors) => {
      const errorArray = []
      switch(errors.message) {
        case SignupError.emailAlreadyInUse : errorArray.push(SignupError.emailAlreadyInUse)
        break
        default : errorArray.push(SignupError.unknown)
      }
      setErrors(errorArray)
    })
  }


  function formIsValid() {
    const errorArray = []
    if (!nameEntered()) errorArray.push(SignupError.nameIsEmpty)
    if (!emailIsValid()) errorArray.push(SignupError.emailNotValid)
    if (!passwordIsValid()) errorArray.push(SignupError.passwordsIsInvalid)
    if (!passwordsAreEqual()) errorArray.push(SignupError.passwordsAreUnequal)
    if (!acceptTAC) errorArray.push(SignupError.notAcceptedTAC)
    if (errorArray.length > 0) {
      setErrors(errorArray)
      return false
    } else return true
  } 

  const nameEntered = () => name.length > 0
  function emailIsValid() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const passwordIsValid = () => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$/.test(password1)
  const passwordsAreEqual = () => password1 === password2


  const setValueVia = setter => event => setter(event.target.value)
  const errorOccured = error => Array.isArray(errors) && errors.includes(error)


  return(
    <StandardPage className="signup" title="Do you want to join Partycipate? Sign up here! 🎉">
      <div className="signup-body"> 
        <CardElement className="primary-element su-card">
          <form onSubmit={handleSignup} noValidate>
            <TitleElement>Register now</TitleElement>
            <label htmlFor="name">Your name:</label>
            <input className="email" type="text" placeholder="Enter Name" name="name" value={name} onChange={setValueVia(setName)}/>

            { errorOccured(SignupError.nameIsEmpty) && <small className="error">Please enter a name!</small> }

            <label htmlFor="email">E-Mail:</label>
            <input className="email" type="email" placeholder="Enter E-Mail" name="email" value={email} onChange={setValueVia(setEmail)}/>
            
            { errorOccured(SignupError.emailAlreadyInUse)
              ? <small className="errormessage">The e-mail is already in use. Please provide another email!</small>
              : errorOccured(SignupError.emailNotValid) && <small className="error">The e-mail is invalid.</small>
            }

            <label htmlFor="pw">Password:</label>
            <input className="pass" type="password" placeholder="Enter Password" name="pw" value={password1} onChange={setValueVia(setPassword1)}/>
            <small className={errorOccured(SignupError.passwordsIsInvalid) ? "error" : ""}>Your password needs at least a length of 10 characters and needs to contain numbers, uppercase and lowercase letters.</small>

            <label htmlFor="repeat-pw">Repeat password:</label>
            <input className="pass" type="password" placeholder="Repeat Password" name="repeat-pw" value={password2} onChange={setValueVia(setPassword2)}/>
            { errorOccured(SignupError.passwordsAreUnequal) && <small className="error">Your password is not equal to the one mentioned above. Please try again!</small> }

            <div className="tac-statement">
              <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={acceptTAC} onClick={() => setAcceptTAC(!acceptTAC)}/>
              <label htmlFor="checkbox_id" id="text">I have read and accept the terms and conditions and the <Link to={process.env.REACT_APP_PATH_PRIVACY_STATEMENT}>privacy policy</Link> of Partycipate.</label>
            </div>
            { errorOccured(SignupError.notAcceptedTAC) && <small className="error">Please accept our terms and conditions to continue!</small> }
            { errorOccured(SignupError.unknown) && <small className="error">An error occured. Please try again in some minutes!</small> }
            
            <button className="btn-dark btn-icon-right">Register<FiChevronRight/></button>
          </form>
        </CardElement>  
      </div>
    </StandardPage>
  )
}
 
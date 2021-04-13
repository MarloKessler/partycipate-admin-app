import { useState } from 'react'
import { Link } from "react-router-dom"
import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import Server from "../Server"
import { FiChevronRight } from "react-icons/fi"
import Checkbox from '@material-ui/core/Checkbox'
import StandardPage from "../StandardPage"



export default function SignupView() {
  const [name, setName]           = useState("")
  const [email, setEmail]         = useState("")
  const [password1, setPassword1]   = useState("")
  const [password2, setPassword2]   = useState("")
  const [acceptTAC, setAcceptTAC] = useState(false)

  const [passwordShort, setpasswordShort] = useState(false)
  const [passwordUnequal, setpasswordUnequal] = useState(false)
  const [nameEmpty, setNameEmpty] = useState(false)

  const [errors, setErrors] = useState(false)

  const SignupError = {
    emailError : "emailError",
    unknownError : "unknownError",
    checkError : "checkError",
  }

  function handleSignup(event) {
    event.preventDefault()
    if (!formIsValid()) return
    Server.auth().signup(email, password1, name)
    .catch((errors) => {
      const errorArray = []
      switch(errors.message) {
        case SignupError.emailError : errorArray.push(SignupError.emailError)
        case SignupError.checkError : errorArray.push(SignupError.checkError)
        break
        default : errorArray.push(SignupError.unknownError)
    }
    })
  }

  const formIsValid = () => validateEmail(email) || nameEntered() || passwordLength() || passwordIsUnequal() || terms()

  function nameEntered() {
    if (name.length < 0) return
    setNameEmpty(true)
  }

  function passwordLength() {
    if (password1.length >= 10) return
      setpasswordShort(true)
  }

  function passwordIsUnequal() {
    if (password1 === password2) return
    setpasswordUnequal(true)
  }

  function terms() {
    if (acceptTAC === false) return
    setAcceptTAC(true)
  }

  function validateEmail(email) {
    //if (email.length < 0) {
    //  setEmail(true)
    //}
    //else {
    const re = /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/
    return re.test(String(email).toLowerCase())
    //}
  }

  const setValueVia = setter => event => setter(event.target.value)

  return(
    <StandardPage className="signup" title="Do you want to join Partycipate? Sign up here 🎉">
      <div className="signup-body"> 
        <CardElement className="primary-element su-card">
          <form onSubmit={handleSignup}>
            <PageTitleElement>Register now</PageTitleElement>
            <label htmlFor="name">Your Name:</label>
            <input className="email" type="text" placeholder="Enter Name" name="name" value={name} onChange={setValueVia(setName)}/>

            { nameEmpty && <small className="errormessage">Please enter a name!</small> }

            <label htmlFor="email">E-Mail:</label>
            <input className="email" type="email" placeholder="Enter E-Mail" name="email" value={email} onChange={setValueVia(setEmail)}/>
            
            { email && <small className="errormessage">The e-mail is already in use or invalid. Please try another email!</small> }

            <label htmlFor="pw">Password:</label>
            <input className="pass" type="password" placeholder="Enter Password" name="pw" value={password1} onChange={setValueVia(setPassword1)}/>
            
            <label htmlFor="repeat-pw">Repeat password:</label>
            <input className="pass" type="password" placeholder="Repeat Password" name="repeat-pw" value={password2} onChange={setValueVia(setPassword2)}/>
            
            { passwordUnequal && <small className="errormessage">Your password is not equal to the one mentioned above. Please try again!</small> }
            { passwordShort && <small className="errormessage">Your password needs at least a length of 10 characters. Please try again!</small> }
           
           
            <div className="tac-statement">
              <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={acceptTAC} onClick={() => setAcceptTAC(!acceptTAC)}/>
              <label htmlFor="checkbox_id" id="text">I have read and accept the terms and conditions and the <Link to="/privacy">privacy policy</Link> of Partycipate.</label>
              
            { !acceptTAC && <small className="errormessage">Please accept our terms and conditions to continue!</small> }
            { (Array.isArray(errors) && errors.includes(SignupError.unknownError)) && <small className="errormessage">Your password needs at least a length of 10 characters. Please try again!</small> }


            </div>
            <div className="toolbar">
              <button className="btn-dark btn-icon-right">Register<FiChevronRight/></button>
            </div>
          </form>
        </CardElement>  
      </div>
    </StandardPage>
  )
}
 
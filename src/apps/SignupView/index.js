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

  const [error, setError] = useState(false)

  const SignupError = {
    error: "error",
  }

  function handleSignup(event) {
    event.preventDefault()
    if (!formIsValid()) return
    Server.auth().signup(email, password1, name)
    .catch((error) => {setError(SignupError.error)})
  }

  const formIsValid = () => validateEmail(email) && password1.length >= 10 && password1 === password2 && name !== "" && acceptTAC

  function validateEmail(email) {
    const re = /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/
    return re.test(String(email).toLowerCase())
  }

  const setValueVia = setter => event => setter(event.target.value)

  return(
    <StandardPage className="signup" title="Do you want to join Partycipate? Sign up here 🎉">
      <div className="signup-body"> 
        <CardElement className="primary-element su-card">
          <form onSubmit={handleSignup}>
            <PageTitleElement>Register now</PageTitleElement>
            <label htmlFor="name">Your Name:</label>
            <input className="email" type="text" placeholder="Enter Name" name="name" value={name} required onChange={setValueVia(setName)}/>
            <label htmlFor="email">E-Mail:</label>
            <input className="email" type="email" placeholder="Enter E-Mail" name="email" value={email} required onChange={setValueVia(setEmail)}/>

            <label htmlFor="pw">Password:</label>
            <input className="pass" type="password" placeholder="Enter Password" name="pw" value={password1} required onChange={setValueVia(setPassword1)}/>
            
            <label htmlFor="repeat-pw">Repeat password:</label>
            <input className="pass" type="password" placeholder="Repeat Password" name="repeat-pw" value={password2} required onChange={setValueVia(setPassword2)}/>
            
            { error === SignupError.error && <small className="errormessage">Your account couldn't be created. Please try again!</small> }
           
            <div className="tac-statement">
              <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={acceptTAC} required onClick={() => setAcceptTAC(!acceptTAC)}/>
              <label htmlFor="checkbox_id" id="text">I have read and accept the terms and conditions and the <Link to="/privacy">privacy policy</Link> of Partycipate.</label>
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
 
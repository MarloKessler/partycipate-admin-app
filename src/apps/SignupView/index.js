import { useState } from 'react'
import { Link } from "react-router-dom"
import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import Server from "../Server"
import { FiChevronRight } from "react-icons/fi"
import Checkbox from '@material-ui/core/Checkbox'



export default function SignupView() {
  const [name, setName]           = useState("")
  const [email, setEmail]         = useState("")
  const [password1, setPassword1]   = useState("")
  const [password2, setPassword2]   = useState("")
  const [acceptTAC, setAcceptTAC] = useState(false)

  function handleSignup(event) {
    event.preventDefault()
    if (!formIsValid()) return
    Server.auth().signup(email, password1, name)
    .catch(() => {})
  }

  const formIsValid = () => validateEmail(email) && password1.length > 10 && password1 === password2 && name !== "" && acceptTAC

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const setValueVia = setter => event => setter(event.target.value)

  return(
    <div className="signup">
      <PageTitleElement className="signupHeader">Do you want to join Partycipate? Sign up here 🎉</PageTitleElement>
      <div className="signup-body"> 
        <CardElement className="celement">
          <form onSubmit={handleSignup}>
            <PageTitleElement className="Sign-up">Register now</PageTitleElement>
            <label htmlFor="name" className="labelUN">Your Name:</label>
            <br/>
            <input className="email" align="center" type="text" placeholder="Enter Name" name="name" value={name} required onChange={setValueVia(setName)}/>
            <br/>
            <br/>
            <label htmlFor="email" className="labelUN">E-Mail:</label>
            <br/>
            <input className="email" align="center" type="email" placeholder="Enter E-Mail" name="email" value={email} required onChange={setValueVia(setEmail)}/>
            <br/>
            <br/>
            <label htmlFor="pw" className="labelUN">Password:</label>
            <br/>
            <input className="pass" align="center" type="password" placeholder="Enter Password" name="pw" value={password1} required onChange={setValueVia(setPassword1)}/>
            <br/>
            <br/>
            <label htmlFor="repeat-pw" className="labelUN">Repeat password:</label>
            <br/>
            <input className="pass" align="center" type="password" placeholder="Repeat Password" name="repeat-pw" value={password2} required onChange={setValueVia(setPassword2)}/>
            <br/>
            <br/> 
            <div className="tac-statement">
              <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} checked={acceptTAC} required onClick={() => setAcceptTAC(!acceptTAC)}/>
              <label htmlFor="checkbox_id" id="text">I have read and accept the terms and conditions and the <Link to="/privacy">privacy policy</Link> of Partycipate.</label>
            </div>
            <div className="toolbar">
              <button className="button btn-dark" type="submit">Register<FiChevronRight/></button>
            </div>
          </form>
        </CardElement>  
      </div>
    </div>
  )
}
 
import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { Link } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';



export default function SignupView(){
  
    const [checked, setChecked] = React.useState(true);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  return(
    <div className="signup">
      <PageTitleElement className="signupHeader">Do you want to join Partycipate? Sign up here 🎉</PageTitleElement>
      <div className="signup-body"> 
        <CardElement className="celement">
          <PageTitleElement className="Sign-up"><a>Register now</a></PageTitleElement>
          <label for="uname" className="labelUN"><b>E-Mail:</b></label><br/>
          <input className="un " align="center" type="text" placeholder="Enter E-Mail" name="uname" required></input>
          <br/>
          <br/>
          <label for="psw" className="labelPass"><b>Password:</b></label><br/>
          <input className="pass" align="center" type="password" placeholder="Enter Password" name="psw" required></input>
          <label for="psw" className="labelPassRe"><b>Repeat password:</b></label><br/>
          <br/>
          <br/>
          <input class="pass" align="center" type="password" placeholder="Repeat Password" name="psw" required></input>
          <br/>
          <br/> 
          <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} id="checkbox_id" />
          <label for="checkbox_id" id="text">I have read and accept the terms and conditions and the privacy policy of Partycipate.</label>
          <Link to="/">
        <div className="toolbar">
          <button className="button btn-dark" type="submit">Register<FiChevronRight/></button>
        </div>
      </Link>
        </CardElement>  
      </div>

    </div>
  )
}
 
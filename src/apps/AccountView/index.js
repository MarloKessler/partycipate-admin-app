import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { Link } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"
import { useState } from "react"
import Notification from "../Notification"


export default function AccountView() {
  const [ showWarning, setShowWarning ] = useState(false)

  const handleDelete = () => {
    console.log("delete account")
  }
  
  return(
    <div className="changepw">
      <PageTitleElement className="changepwHeader">Make changes to your account 🎉</PageTitleElement>
      <div className="changepw-body"> 
        <CardElement className="celement">
          <PageTitleElement className="Change-pw"><a>Change your password here</a></PageTitleElement>
          <label for="uname" className="labelUN"><b>Old password:</b></label><br/>
          <input className="pass" align="center" type="password" placeholder="Enter old password" name="uname" required></input>
          <br/>
          <br/>
          <label for="psw" className="labelPass"><b>New password:</b></label><br/>
          <input className="pass" align="center" type="password" placeholder="Enter new password" name="psw" required></input>
          <br/>
          <br/>
          <label for="psw" className="labelPassRe"><b>Repeat new password:</b></label><br/>
          <input className="pass" align="center" type="password" placeholder="Repeat new password" name="psw" required></input>
            
            <div className="toolbar">
            <button className="button btn-dark" type="submit">Change now<FiChevronRight/></button>
            </div>
        </CardElement>  

        
        <CardElement className="delement">
          <PageTitleElement className="delete"><a>Delete your Account here</a></PageTitleElement>
            <br/>
            <div className="del"> 
            <div>If you choose to delete your account, all surveys will become inactive and all survey results will be lost.</div>
            <br/>
            <br/>
            <div>We will delete all data related to your account.</div>
            <br/>
            <br/>
            <div>Please note that an account deletion cannot be undone.</div>
            <br/>
            <br/>
            </div>
            <div className="toolbar">
            
            <button className="button btn-dark" type="submit" onClick={() => setShowWarning(true)}>Delete now<FiChevronRight/></button>
            </div>
        </CardElement>  

        
      </div>
      <Notification show={showWarning} className="notification">
        <p className="message">Do you really want to delete your account? This cannot be undone!</p>
        <div className="notification-toolbar">
          <button onClick={() => setShowWarning(false)} className="messagebutton-cancel">Cancel</button>
          <button onClick={handleDelete} className="messagebutton-delete">Delete</button>
        </div>
      </Notification>
    </div>
  )
}




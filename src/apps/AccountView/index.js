import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { FiChevronRight } from "react-icons/fi"
import { useState } from "react"
import Notification from "../Notification"
import Server from "../Server"


export default function AccountView() {
  const [ oldPW, setOldPW ] = useState("")
  const [ pw1, setPW1 ]     = useState("")
  const [ pw2, setPW2 ]     = useState("")
  const [ showWarning, setShowWarning ] = useState(false)
  

  function changePW(event) {
    event.preventDefault()
    if (oldPW === "" || pw1.length < 10 || pw1 !== pw2) return
    Server.auth().updatePassword(oldPW, pw1)
    .then(() => {
      setOldPW("")
      setPW1("")
      setPW2("")
    })
    .catch(() => {})
  }
  const deleteUser = () => Server.auth().deleteUser().catch(() => {})

  const setValueVia = setter => event => setter(event.target.value)
  
  return(
    <div className="changepw">
      <PageTitleElement className="changepwHeader" helpSection="account">Make changes to your account 🎉</PageTitleElement>
      <div className="changepw-body"> 
        <CardElement className="celement">
          <form onSubmit={changePW}>
            <PageTitleElement className="Change-pw">Change your Password here</PageTitleElement>
            <label for="oldpw" className="labelUN">Old password:</label><br/>
            <input className="pass" align="center" type="password" placeholder="Enter old password" name="oldpw" value={oldPW} required onChange={setValueVia(setOldPW)}/>
            <br/>
            <br/>
            <label for="pw1" className="labelPass">New password:</label><br/>
            <input className="pass" align="center" type="password" placeholder="Enter new password" name="pw1" value={pw1} required onChange={setValueVia(setPW1)}/>
            <br/>
            <br/>
            <label for="pw2" className="labelPassRe">Repeat new password:</label><br/>
            <input className="pass" align="center" type="password" placeholder="Repeat new password" name="pw2" value={pw2} required onChange={setValueVia(setPW2)}/>
            <div className="toolbar">
              <button className="button btn-dark">Change now<FiChevronRight/></button>
            </div>
          </form>
        </CardElement>  

        <CardElement className="delement">
          <PageTitleElement className="delete">Delete your Account here</PageTitleElement>
            <br/>
            <div className="del"> 
              <div>If you choose to delete your Account, all surveys will become inactive and all survey results will be lost.</div>
              <br/>
              <br/>
              <div>We will delete all data related to your Account.</div>
              <br/>
              <br/>
              <div>Please note that an Account deletion cannot be undone.</div>
              <br/>
              <br/>
            </div>
            <div className="toolbar">
              <button className="button btn-dark" onClick={() => setShowWarning(true)}>Delete now<FiChevronRight/></button>
            </div>
        </CardElement>
      </div>

      <Notification show={showWarning} className="notification">
        <p className="message">Do you really want to delete your Account? This cannot be undone!</p>
        <div className="notification-toolbar">
          <button onClick={() => setShowWarning(false)} className="messagebutton-cancel">Cancel</button>
          <button onClick={deleteUser} className="messagebutton-delete">Delete</button>
        </div>
      </Notification>
    </div>
  )
}




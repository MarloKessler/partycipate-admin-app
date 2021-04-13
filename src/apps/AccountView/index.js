import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { FiChevronRight } from "react-icons/fi"
import { useState } from "react"
import Notification from "../Notification"
import Server from "../Server"
import StandardPage from "../StandardPage"


export default function AccountView() {
  const [ oldPW, setOldPW ] = useState("")
  const [ pw1, setPW1 ]     = useState("")
  const [ pw2, setPW2 ]     = useState("")
  const [ showWarning, setShowWarning ] = useState(false)

  const [errors, setErrors] = useState(false)

  const AccountError = {
    oldError: "oldError",
    passwordUnequalError: "passwordUnequalError",
    passwordShortError: "passwordShortError",
    unknownError : "unknownError"
  }

  const deleteUser = () => Server.auth().deleteUser().catch(() => {})
  const setValueVia = setter => event => setter(event.target.value)

  function changePW(event) {
    event.preventDefault()
    if (oldPW === "" || pw1.length < 10 || pw1 !== pw2) return
    Server.auth().updatePassword(oldPW, pw1)
    .then(() => {
      setErrors(undefined)
      setOldPW("")
      setPW1("")
      setPW2("")
    })
    .catch((errors) => {
      const errorArray = []
      switch(errors.message) {
        case AccountError.oldError : errorArray.push(AccountError.oldError)
        case AccountError.passwordUnequalError : errorArray.push(AccountError.passwordUnequalError)
        case AccountError.passwordShortError : errorArray.push(AccountError.passwordShortError)
        break
        default : errorArray.push(AccountError.unknownError)
      } 
      setErrors(errorArray)
    })
  }
  
  return(
    <StandardPage
      className="account-view"
      title="Make changes to your account 🎉"
    >
      <div className="av-body">
        <CardElement className="secondary-element av-card">
          <form onSubmit={changePW}>
            <PageTitleElement className="Change-pw">Change your Password here</PageTitleElement>
            <label htmlFor="oldpw">Old password:</label>
            <input type="password" placeholder="Enter old password" name="oldpw" value={oldPW} required onChange={setValueVia(setOldPW)}/>

            { (Array.isArray(errors) && errors.includes(AccountError.oldError)) && <small className="errormessage">The old password is not correct. Please try again.</small> }

            <label htmlFor="pw1">New password:</label>
            <input type="password" placeholder="Enter new password" name="pw1" value={pw1} required onChange={setValueVia(setPW1)}/>
            <label htmlFor="pw2">Repeat new password:</label>
            <input type="password" placeholder="Repeat new password" name="pw2" value={pw2} required onChange={setValueVia(setPW2)}/>

            { (Array.isArray(errors) && errors.includes(AccountError.passwordUnequalError)) && <small className="errormessage">Your password is not equal to the one mentioned above. Please try again!</small> }
            { (Array.isArray(errors) && errors.includes(AccountError.passwordShortError)) && <small className="errormessage">Your password needs at least a length of 10 characters. Please try again!</small> }
            { (Array.isArray(errors) && errors.includes(AccountError.unknownError)) && <small className="errormessage">Your password needs at least a length of 10 characters. Please try again!</small> }

            <div className="toolbar">
              <button className="btn-dark btn-icon-right">Change now<FiChevronRight/></button>
            </div>
          </form>
        </CardElement>

        <CardElement className="secondary-element av-card">
          <PageTitleElement className="delete">Delete your Account here</PageTitleElement>
          <div className="del"> 
            <p>If you choose to delete your Account, all surveys will become inactive and all survey results will be lost.</p>
            <p>We will delete all data related to your Account.</p>
            <p>Please note that an Account deletion cannot be undone.</p>
          </div>
          <div className="toolbar">
            <button className="btn-dark btn-icon-right" onClick={() => setShowWarning(true)}>Delete now<FiChevronRight/></button>
          </div>
        </CardElement>
      </div>

      <Notification show={showWarning}>
        <p>Do you really want to delete your Account? This cannot be undone!</p>
        <div className="toolbar">
          <button onClick={() => setShowWarning(false)} className="btn-dark">Cancel</button>
          <button onClick={deleteUser} className="btn-dark btn-delete">Delete</button>
        </div>
      </Notification>
    </StandardPage>
  )

    }

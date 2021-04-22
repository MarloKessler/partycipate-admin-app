import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import { FiChevronRight } from "react-icons/fi"
import { useState } from "react"
import Notification from "../Notification"
import Server from "../Server"
import StandardPage from "../StandardPage"
import { HelpSections } from "../DocsView"
import { useEffect } from 'react'


const UpdateUserError = {
  nameError: "nameError",
  emailError: "emailError",
  unknownError : "unknownError",
}

const UpdatePWError = {
  oldError: "oldError",
  passwordUnequalError: "passwordUnequalError",
  passwordShortError: "passwordShortError",
  unknownError : "unknownError",
}


export default function AccountView() {
  const [oldPW, setOldPW] = useState("")
  const [pw1, setPW1]     = useState("")
  const [pw2, setPW2]     = useState("")
  const [name, setName]     = useState("")
  const [email, setEmail]   = useState("")
  const [showWarning, setShowWarning] = useState(false)

  const [updateUserSuccess, setUpdateUserSuccess] = useState()
  const [updateUserErrors, setUpdateUserErrors] = useState()
  const [updatePWSuccess, setUpdatePWSuccess] = useState()
  const [updatePWErrors, setUpdatePWErrors] = useState()

  useEffect(() => {
    const user = Server.auth().currentUser()
    setName(user.name)
    setEmail(user.email)
  }, [])

  function emailIsValid() {
    const re = /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/
    return re.test(String(email).toLowerCase())
  }

  const deleteUser = () => Server.auth().deleteUser().catch(() => {})
  const setValueVia = setter => event => setter(event.target.value)
  const nameEntered = () => name.length > 0

  function validatePWForm() {
    const errorArray = []
    if (oldPW === "") errorArray.push(UpdatePWError.oldError)
    if (pw1.length < 10) errorArray.push(UpdatePWError.passwordShortError)
    if (pw1 !== pw2) errorArray.push(UpdatePWError.passwordUnequalError)
    if (errorArray.length > 0) {
      setUpdatePWErrors(errorArray)
      return false
    } else return true
  }

  function updatePW(event) {
    event.preventDefault()
    const inputIsValid = validatePWForm()
    if (!inputIsValid) return
    Server.auth().updatePassword(oldPW, pw1)
    .then(() => {
      setUpdatePWSuccess(true)
      setUpdatePWErrors(undefined)
      setOldPW("")
      setPW1("")
      setPW2("")
    })
    .catch((errors) => {
      const errorArray = []
      switch(errors.message) {
        case UpdatePWError.oldError : errorArray.push(UpdatePWError.oldError)
        //case UpdatePWError.passwordUnequalError : errorArray.push(UpdatePWError.passwordUnequalError)
        //case UpdatePWError.passwordShortError : errorArray.push(UpdatePWError.passwordShortError)
        break
        default : errorArray.push(UpdatePWError.unknownError)
      } 
      setUpdatePWErrors(errorArray)
    })
    .finally(() => setTimeout(() => setUpdatePWSuccess(false), 5000))
  }

  function updateUser(event) {
    event.preventDefault()
    if (!validateUserForm()) return
    Server.auth().updateUser(email, name)
    .then(() => {
      setUpdateUserErrors(undefined)
      setUpdateUserSuccess(true)
    })
    .catch((errors) => {
      const errorArray = []
      switch(errors.message) {
        case UpdateUserError.nameError : errorArray.push(UpdateUserError.nameError)
        case UpdateUserError.emailError : errorArray.push(UpdateUserError.emailError)
        break
        default : errorArray.push(UpdateUserError.unknownError)
      }
      setUpdateUserErrors(errorArray)
    })
    .finally(() => setTimeout(() => setUpdateUserSuccess(false), 5000))
  }

  function validateUserForm() {
    const errorArray = []
    if (!nameEntered()) errorArray.push(UpdateUserError.nameError)
    if (!emailIsValid()) errorArray.push(UpdateUserError.emailError)
    if (errorArray.length > 0) {
      setUpdateUserErrors(errorArray)
      return false
    } else return true
  }

  const updateUserErrorOccured = error => Array.isArray(updateUserErrors) && updateUserErrors.includes(error)
  const updatePWErrorOccured = error => Array.isArray(updatePWErrors) && updatePWErrors.includes(error)
  
  return(
    <StandardPage
      className="account-view"
      title="Make changes to your account 🎉"
      helpSection={HelpSections.account}
    >
      <div className="av-body">
        <CardElement className="secondary-element av-card">
          <form onSubmit={updateUser} noValidate>
            <PageTitleElement className="Change-name">Change your name and e-mail here</PageTitleElement>
            <label htmlFor="newname">New name:</label>
            <input type="name" placeholder="Enter name" name="newname" value={name} onChange={setValueVia(setName)}/>
            { updateUserErrorOccured(UpdateUserError.nameError) && <small className="error">Please enter a name!</small> }

            <label htmlFor="newemail">New e-mail:</label>
            <input type="email" placeholder="Enter e-mail" name="newemail" value={email} onChange={setValueVia(setEmail)}/>
            { updateUserErrorOccured(UpdateUserError.emailError) && <small className="error">The e-mail is invalid. Please try again!</small> }
            { updateUserErrorOccured(UpdateUserError.unknownError) && <small className="error">An error occured. Please try again in some minutes!</small> }
            { updateUserSuccess && <small className="success">Your profile was successfully changed!</small> }
            
            <div className="buttonbar">
            <button className="btn-dark btn-icon-right">Change now<FiChevronRight/></button>
            </div>
          </form>
        </CardElement>

        <CardElement className="secondary-element av-card">
          <form onSubmit={updatePW} noValidate>
            <PageTitleElement className="Change-pw">Change your password here</PageTitleElement>
            <label htmlFor="oldpw">Old password:</label>
            <input type="password" placeholder="Enter old password" name="oldpw" value={oldPW} onChange={setValueVia(setOldPW)}/>
            { updatePWErrorOccured(UpdatePWError.oldError) && <small className="error">The old password is not correct. Please try again.</small> }

            <label htmlFor="pw1">New password:</label>
            <input type="password" placeholder="Enter new password" name="pw1" value={pw1} onChange={setValueVia(setPW1)}/>
            { updatePWErrorOccured(UpdatePWError.passwordShortError) && <small className="error">Your password needs at least a length of 10 characters. Please try again!</small> }

            <label htmlFor="pw2">Repeat new password:</label>
            <input type="password" placeholder="Repeat new password" name="pw2" value={pw2} onChange={setValueVia(setPW2)}/>
            { updatePWErrorOccured(UpdatePWError.passwordUnequalError) && <small className="error">Your password is not equal to the one mentioned above. Please try again!</small> }
            { updatePWErrorOccured(UpdatePWError.unknownError) && <small className="error">An error occured. Please try again in some minutes!</small> }
            { updatePWSuccess && <small className="success">Your password was successfully changed!</small> }
            
            <div className="buttonbar">
            <button className="btn-dark btn-icon-right">Change now<FiChevronRight/></button>
            </div>
          </form>
        </CardElement>

        <CardElement className="secondary-element av-card">
          <PageTitleElement className="delete">Delete your account here</PageTitleElement>
          <div className="del"> 
            <p>If you choose to delete your account, all surveys will become inactive and all survey results will be lost.</p>
            <p>We will delete all data related to your account.</p>
            <p>Please note that an account deletion cannot be undone.</p>
          </div>
          <div className="buttonbar">
          <button className="btn-dark btn-icon-right" onClick={() => setShowWarning(true)}>Delete now<FiChevronRight/></button>
          </div>
        </CardElement>
      </div>

      <Notification show={showWarning}>
        <p>Do you really want to delete your account? This cannot be undone!</p>
        <div className="toolbar">
          <button onClick={() => setShowWarning(false)} className="btn-dark">Cancel</button>
          <button onClick={deleteUser} className="btn-dark btn-delete">Delete</button>
        </div>
      </Notification>
    </StandardPage>
  )
}
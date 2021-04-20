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


export default function AccountView() {
  const [oldPW, setOldPW] = useState("")
  const [pw1, setPW1]     = useState("")
  const [pw2, setPW2]     = useState("")
  const [name, setName]     = useState("")
  const [email, setEmail]   = useState("")
  const [showWarning, setShowWarning] = useState(false)

  const [changePWSuccess, setChangePWSuccess] = useState()
  const [errors, setErrors] = useState()

    const AccountError = {
    oldError: "oldError",
    passwordUnequalError: "passwordUnequalError",
    passwordShortError: "passwordShortError",
    unknownError : "unknownError",
    nameError: "nameError",
    emailError: "emailError"
  }

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

  function validateInput() {
    const errorArray = []
    if (oldPW === "") errorArray.push(AccountError.oldError)
    if (pw1.length < 10) errorArray.push(AccountError.passwordShortError)
    if (pw1 !== pw2) errorArray.push(AccountError.passwordUnequalError)
    if (errorArray.length > 0) {
      setErrors(errorArray)
      return false
    } else return true
  }

  function changePW(event) {
    event.preventDefault()
    const inputIsValid = validateInput()
    if (!inputIsValid) return
    Server.auth().updatePassword(oldPW, pw1)
    .then(() => {
      setChangePWSuccess(true)
      setErrors(undefined)
      setOldPW("")
      setPW1("")
      setPW2("")
    })
    .catch((errors) => {
      const errorArray = []
      switch(errors.message) {
        case AccountError.oldError : errorArray.push(AccountError.oldError)
        //case AccountError.passwordUnequalError : errorArray.push(AccountError.passwordUnequalError)
        //case AccountError.passwordShortError : errorArray.push(AccountError.passwordShortError)
        break
        default : errorArray.push(AccountError.unknownError)
      } 
      setErrors(errorArray)
    })
    .finally(() => setTimeout(() => setChangePWSuccess(false), 5000))
  }

  function handleChanges(event) {
    event.preventDefault()
    if (!formIsValid()) return
    Server.auth().signup(email, name)
    .then(() => setErrors(undefined))
    .catch((errors) => {
      const errorArray = []
      switch(errors.message) {
        case AccountError.nameError : errorArray.push(AccountError.nameError)
        case AccountError.emailError : errorArray.push(AccountError.emailError)
        break
        default : errorArray.push(AccountError.unknownError)
      }
      setErrors(errorArray)
    })
  }

  function formIsValid() {
    const errorArray = []
    if (!nameEntered()) errorArray.push(AccountError.nameError)
    if (!emailIsValid()) errorArray.push(AccountError.emailError)
    if (errorArray.length > 0) {
      setErrors(errorArray)
      return false
    } else return true
  } 

  const errorOccured = error => Array.isArray(errors) && errors.includes(error)
  
  return(
    <StandardPage
      className="account-view"
      title="Make changes to your account 🎉"
      helpSection={HelpSections.account}
    >
      <div className="av-body">
        <CardElement className="secondary-element av-card">
          <form onSubmit={changePW} noValidate>
            <PageTitleElement className="Change-pw">Change your password here</PageTitleElement>
            <label htmlFor="oldpw">Old password:</label>
            <input type="password" placeholder="Enter old password" name="oldpw" value={oldPW} onChange={setValueVia(setOldPW)}/>

            { errorOccured(AccountError.oldError) && <small className="error">The old password is not correct. Please try again.</small> }

            <label htmlFor="pw1">New password:</label>
            <input type="password" placeholder="Enter new password" name="pw1" value={pw1} onChange={setValueVia(setPW1)}/>
            { errorOccured(AccountError.passwordShortError) && <small className="error">Your password needs at least a length of 10 characters. Please try again!</small> }

            <label htmlFor="pw2">Repeat new password:</label>
            <input type="password" placeholder="Repeat new password" name="pw2" value={pw2} onChange={setValueVia(setPW2)}/>
            { errorOccured(AccountError.passwordUnequalError) && <small className="error">Your password is not equal to the one mentioned above. Please try again!</small> }
            { errorOccured(AccountError.unknownError) && <small className="error">An error occured. Please try again in some minutes!</small> }
            { changePWSuccess && <small className="success">Your password was successfully changed!</small> }
            <button className="btn-dark btn-icon-right">Change now<FiChevronRight/></button>
          </form>
        </CardElement>

        <CardElement className="secondary-element av-card">
          <PageTitleElement className="delete">Delete your account here</PageTitleElement>
          <div className="del"> 
            <p>If you choose to delete your account, all surveys will become inactive and all survey results will be lost.</p>
            <p>We will delete all data related to your account.</p>
            <p>Please note that an account deletion cannot be undone.</p>
          </div>
          <button className="btn-dark btn-icon-right" onClick={() => setShowWarning(true)}>Delete now<FiChevronRight/></button>
        </CardElement>
        

      <CardElement className="secondary-element av-card">
          <form onSubmit={handleChanges} noValidate>
            <PageTitleElement className="Change-name">Change your name and e-mail here</PageTitleElement>
            <label htmlFor="newname">New name:</label>
            <input type="name" placeholder= {name} name="newname" value={name} onChange={setValueVia(setName)}/>
            { errorOccured(AccountError.nameError) && <small className="error">Please enter a name!</small> }

            <label htmlFor="newemail">New e-mail:</label>
            <input type="email" placeholder="Enter e-mail" name="newemail" value={email} onChange={setValueVia(setEmail)}/>
            { errorOccured(AccountError.emailError) && <small className="error">The e-mail is invalid. Please try again!</small> }
           
            <button className="btn-dark btn-icon-right">Change now<FiChevronRight/></button>
          </form>
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

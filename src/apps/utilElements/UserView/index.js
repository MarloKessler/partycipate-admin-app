import "./style.css"
import { FiChevronRight } from "react-icons/fi"
import { useState } from "react"
import { TitleElement, CardElement, Notification, StandardPage } from ".."

const UpdateUserError = {
  nameError: "nameError",
  emailError: "emailError",
  unknownError : "unknownError",
}

const UpdatePWError = {
  oldPWIsWrong: "Fail -> Old Password is wrong",
  passwordUnequalError: "passwordUnequalError",
  passwordRules: "Fail -> PasswordRules didn't match",
  unknownError : "unknownError",
}


export function UserView({ user, helpSection, validateWithOldPasswort=false, onUpdateUser: updateUser, onUpdatePW: updatePW, onDeleteUser: deleteUser }) {
  const [oldPW, setOldPW] = useState("")
  const [pw1, setPW1]     = useState("")
  const [pw2, setPW2]     = useState("")
  const [name, setName]   = useState(user.name || "")
  const [email, setEmail] = useState(user.email || "")

  const [showDeletationWarning, setShowDeletationWarning] = useState(false)

  const [updateUserSuccess, setUpdateUserSuccess] = useState()
  const [updateUserErrors, setUpdateUserErrors] = useState()
  const [updatePWSuccess, setUpdatePWSuccess] = useState()
  const [updatePWErrors, setUpdatePWErrors] = useState()

  const setValueVia = setter => event => setter(event.target.value)


  const nameIsValid = () => /^(([A-Za-z0-9-]{1,30})[ ]?)*([A-Za-z0-9-]{1,30})?$/.test(name)

  function emailIsValid() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function validatePWForm() {
    const errorArray = []
    if (validateWithOldPasswort && oldPW === "") errorArray.push(UpdatePWError.oldPWIsWrong)
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$/.test(pw1)) errorArray.push(UpdatePWError.passwordRules)
    if (pw1 !== pw2) errorArray.push(UpdatePWError.passwordUnequalError)
    if (errorArray.length > 0) {
      setUpdatePWErrors(errorArray)
      return false
    } else return true
  }


  function handleUpdatePW(event) {
    event.preventDefault()
    const inputIsValid = validatePWForm()
    if (!inputIsValid) return
    updatePW(oldPW, pw1)
    .then(() => {
      setUpdatePWSuccess(true)
      setUpdatePWErrors(undefined)
      setOldPW("")
      setPW1("")
      setPW2("")
    })
    .catch(error => {
      const errorArray = []
      switch(error.message) {
        case UpdatePWError.oldPWIsWrong: errorArray.push(UpdatePWError.oldPWIsWrong)
        case UpdatePWError.passwordRules: errorArray.push(UpdatePWError.passwordRules)
        break
        default: errorArray.push(UpdatePWError.unknownError)
      } 
      setUpdatePWErrors(errorArray)
    })
    .finally(() => setTimeout(() => setUpdatePWSuccess(false), 5000))
  }


  function handleUpdateUser(event) {
    event.preventDefault()
    if (!validateUserForm()) return
    user.name = name
    user.email = email
    updateUser(user)
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
    if (!nameIsValid()) errorArray.push(UpdateUserError.nameError)
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
      className="user-view"
      title="Make changes to this account 🎉"
      helpSection={helpSection}
    >
      <div className="av-body">
        <CardElement className="secondary-element av-card">
          <form onSubmit={handleUpdateUser} noValidate>
            <TitleElement className="Change-name">Change name and e-mail here</TitleElement>
            <label htmlFor="newname">New name:</label>
            <input type="name" placeholder="Enter name" name="newname" value={name} onChange={setValueVia(setName)}/>
            { updateUserErrorOccured(UpdateUserError.nameError) && <small className="error">Please enter a valid name!</small> }

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
          <form onSubmit={handleUpdatePW} noValidate>
            <TitleElement className="Change-pw">Change password here</TitleElement>
            { validateWithOldPasswort &&  <label htmlFor="oldpw">Old password:</label> }
            { validateWithOldPasswort && <input type="password" placeholder="Enter old password" name="oldpw" value={oldPW} onChange={setValueVia(setOldPW)}/> }
            { updatePWErrorOccured(UpdatePWError.oldPWIsWrong) && <small className="error">The old password is not correct. Please try again.</small> }

            <label htmlFor="pw1">New password:</label>
            <input type="password" placeholder="Enter new password" name="pw1" value={pw1} onChange={setValueVia(setPW1)}/>
            <small className={updatePWErrorOccured(UpdatePWError.passwordRules) ? "error" : ""}>The password needs at least a length of 10 characters and needs to contain numbers, uppercase and one lowercase letters.</small>

            <label htmlFor="pw2">Repeat new password:</label>
            <input type="password" placeholder="Repeat new password" name="pw2" value={pw2} onChange={setValueVia(setPW2)}/>
            { updatePWErrorOccured(UpdatePWError.passwordUnequalError) && <small className="error">The password is not equal to the one mentioned above. Please try again!</small> }

            { updatePWErrorOccured(UpdatePWError.unknownError) && <small className="error">An error occured. Please try again in some minutes!</small> }
            { updatePWSuccess && <small className="success">The password was successfully changed!</small> }
            
            <div className="buttonbar">
              <button className="btn-dark btn-icon-right">Change now<FiChevronRight/></button>
            </div>
          </form>
        </CardElement>

        <CardElement className="secondary-element av-card">
          <TitleElement className="delete">Delete account here</TitleElement>
          <div className="del"> 
            <p>If you choose to delete this account, all surveys will become inactive and all survey results will be lost.</p>
            <p>We will delete all data related to this account.</p>
            <p>Please note that an account deletion cannot be undone.</p>
          </div>
          <div className="buttonbar">
            <button className="btn-dark btn-icon-right" onClick={() => setShowDeletationWarning(true)}>Delete now<FiChevronRight/></button>
          </div>
        </CardElement>
      </div>

      <Notification show={showDeletationWarning}>
        <p>Do you really want to delete this account? This cannot be undone!</p>
        <div className="toolbar">
          <button onClick={() => setShowDeletationWarning(false)} className="btn-dark">Cancel</button>
          <button onClick={deleteUser} className="btn-dark btn-delete">Delete</button>
        </div>
      </Notification>
    </StandardPage>
  )
}
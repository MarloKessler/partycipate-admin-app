import PageTitleElement from "../PageTitleElement"
import "./style.css"
import CardElement from "../CardElement"
import Notification from "../Notification"
import { Link } from "react-router-dom"
import { FiChevronRight } from "react-icons/fi"


export default function AccountView(){
  return(
    <div className="changepw">
      <PageTitleElement className="changepwHeader">Make changes to your account 🎉</PageTitleElement>
      <div className="changepw-body"> 
        <CardElement className="celement">
          <PageTitleElement className="Change-pw"><a>Change your password here</a></PageTitleElement>
          <label for="uname" className="labelUN"><b>E-Mail:</b></label><br/>
          <input class="un " align="center" type="text" placeholder="Enter E-Mail" name="uname" required></input>
          <br/>
          <br/>
          <label for="psw" className="labelPass"><b>Password:</b></label><br/>
          <input class="pass" align="center" type="password" placeholder="Enter Password" name="psw" required></input>
          <br/>
          <br/>
          <label for="psw" className="labelPassRe"><b>Repeat password:</b></label><br/>
          <input class="pass" align="center" type="password" placeholder="Repeat Password" name="psw" required></input>
            
            <div className="toolbar">
            <button className="button btn-dark" type="submit">Change now<FiChevronRight/></button>
            </div>
         
        </CardElement>  


        <CardElement className="delement">
          <PageTitleElement className="delete"><a>Delete your account here</a></PageTitleElement>
            <br/>
            <div className="del"> <a>
            If you choose to delete your account, all surveys will become inactive and all survey results will be lost. We will delete all data related to your account.
            <br/>
            <br/>
            Please note that an account deletion cannot be undone.
            </a>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
            <div className="toolbar">
            
            <button className="button btn-dark" type="submit">Delete now<FiChevronRight/></button>
            </div>
        </CardElement>  

        
      </div>

    </div>
  )
}


/*function Notification({ show, children }) {
    return <CardElement className={ `Notification ${show ? "show" : ""}` }>{ children }</CardElement>
}*/
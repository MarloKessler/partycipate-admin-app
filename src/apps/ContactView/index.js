import "./style.css"
import { Link} from "react-router-dom"
import StandardPage from "../StandardPage"
import CardElement from "../CardElement"
import { IoHelpOutline } from "react-icons/io5"
import {AiOutlineMail} from "react-icons/ai"


export default function ContactView(){
  return(
    <div className="contact-view">
      <StandardPage title="Do you need any help ❔ " containerClassName="cv-column cv-left">
        <p>We are happy to help you with  setting up your account, finding the survey that fits to your question or any other sorts of issues.</p>
      </StandardPage>

      <div className="cv-column cv-right">
        <CardElement className="secondary-element cv-card">
          <Link to="/" className="link">
            <AiOutlineMail/>
            info@partycipate.de
          </Link>
          <Link to="/docs" className="link">
            <IoHelpOutline/>
            Docs
          </Link>
        </CardElement>
      </div>
    </div>
  )
}
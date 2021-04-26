import "./style.css"
import { Link} from "react-router-dom"
import { CardElement, StandardPage } from "../../utilElements"
import { IoHelpOutline } from "react-icons/io5"
import {AiOutlineMail} from "react-icons/ai"


export function ContactView(){
  return(
    <div className="contact-view">
      <StandardPage title="Do you need any help ❔ " containerClassName="cv-column cv-left">
        <p>We are happy to help you with  setting up your account, finding the survey that fits to your question or any other sorts of issues.</p>
      </StandardPage>

      <div className="cv-column cv-right">
        <CardElement className="secondary-element cv-card">
          <a href="mailto:hello@partycipate.de" className="link">
            <AiOutlineMail/>
            hello@partycipate.de
          </a>
          <Link to={process.env.REACT_APP_PATH_DOCS} className="link">
            <IoHelpOutline/>
            Docs
          </Link>
        </CardElement>
      </div>
    </div>
  )
}
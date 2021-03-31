import "./style.css"
import { Link} from "react-router-dom"
import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"


export default function ContactView() {
  return(
    <div className="contact">
      <PageTitleElement>Do you need any help ❔ </PageTitleElement>
      <div className="contact-text">We are happy to help you with setting up your account, finding the survey that fits to your question or any other sorts of issues. </div>
      <div className="contact-body">
        <CardElement className="contactBox"> 
          <Link to="/" className="link">
            <div className="email">
                <p>info@partycipate.de</p>
            </div>
          </Link>

          <Link to="/docs" className="link" >
            <div className="help-Link">
                <p>FAQs</p>
            </div>
          </Link>
        </CardElement> 
      </div>
    </div>
  )
}
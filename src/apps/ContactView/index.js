import "./style.css"
import { Link} from "react-router-dom"
import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import { IoHelpOutline } from "react-icons/io5"
import {AiOutlineMail} from "react-icons/ai"


export default function ContactView(){
  let iconStyles = { color: "#647374", fontSize: "3.0em" };
  return(
    <div className="contact">
      <div className="leftcontact">
        <PageTitleElement className="pageelementcontact">Do you need any help ❔ </PageTitleElement>
        <p>We are happy to help you with  setting up your account, finding the survey that fits to your question or any other sorts of issues.</p>
      </div>

      <div className="rightcontact">
        <CardElement className="cardelementcontact">
          <Link to="/" className="link">
              <div className="emailright">
                <AiOutlineMail style={iconStyles}/>
                <p>info@partycipate.de</p>
              </div>
          </Link>
          
          <Link to="/docs" className="link" >
              <div className="faqsright">
                <IoHelpOutline style={iconStyles}/>
                <p>FAQs</p>
              </div>
          </Link>
        </CardElement>
      </div>
    </div>
  )
}

/*export default function ContactView() {
  let iconStyles = { color: "black", fontSize: "3.0em" };
  return(
    <div className="contact"> 
      <div className="leftcontact">
        <PageTitleElement>Do you need any help ❔ </PageTitleElement>
        <p>We are happy to help you with  setting up your account, finding the survey that fits to your question or any other sorts of issues. </p>
      </div>

      <div className="rightcontact">
          <CardElement className="contactBox"> 
            
            <Link to="/" className="link">
              <div>
                <AiOutlineMail style={iconStyles}/>
                <p>info@partycipate.de</p>
              </div>
            </Link>

            <Link to="/docs" className="link" >
              <div>
                <IoHelpOutline style={iconStyles}/>
                <p>FAQs</p>
              </div>
            </Link>

          </CardElement> 
      </div>
    </div>
  )
}
*/
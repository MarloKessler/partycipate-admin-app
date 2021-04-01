import "./style.css"
import { Link} from "react-router-dom"
import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import { IoHelpOutline } from "react-icons/io5"
import {AiOutlineMail} from "react-icons/ai"


export default function ContactView() {
  let iconStyles = { color: "black", fontSize: "3.0em" };
  return(
    <div className="contact">
      
      <div className="left">
        <PageTitleElement>Do you need any help ❔ </PageTitleElement>
        <div>We are happy to help you with  setting up your account, finding the survey that fits to your question or any other sorts of issues. </div>
      </div>

      <div className="right">
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


const Bare = () => {
  return (
    <div>
      <IoHelpOutline />
    </div>
  )
}

/*class Question extends React.Component {
  render() {
    return <IoHelpOutline /> 
  }
}*/
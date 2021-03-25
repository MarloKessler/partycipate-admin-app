import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"

function HomePage(){
    return(
      <div className="tp">
        <PageTitleElement>Welcome back, Partycipant!🎉</PageTitleElement>
        <p className="hello">What do you want to do today?</p>
          <div class="carts">
              <Link to="/create-survey" ><CardElement className='FirstBox'> Create a new survey </CardElement> </Link>
              <Link to="/surveys"><CardElement className='FirstBox'>View results of your surveys</CardElement></Link>
              <Link to="/my-account"><CardElement className='SecondBox'>Change settings of your account</CardElement></Link>
              <Link to="/get-help"><CardElement className='SecondBox'>Get help</CardElement></Link>
          </div>
      </div>
    )
  }


  export default HomePage
  
  


  
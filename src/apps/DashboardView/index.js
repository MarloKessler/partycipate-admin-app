import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"


export default function DashboardView(){
  return(
    <div className="tp">
      <PageTitleElement>Welcome back, Partycipant!🎉</PageTitleElement>
      <p className="hello">What do you want to do today?</p>
        <div className="carts">
          <Link to="/create-survey" ><CardElement className='FirstBox'> Create a new survey </CardElement> </Link>
          <Link to="/surveys"><CardElement className='FirstBox'>View results of your surveys</CardElement></Link>
          <Link to="/my-account"><CardElement className='SecondBox'>Change settings of your account</CardElement></Link>
          <Link to="/docs"><CardElement className='SecondBox'>Docs</CardElement></Link>
        </div>
    </div>
  )
}
  

/*import PageTitleElement from "../PageTitleElement"
import CardElement from "../CardElement"
import "./style.css"
import { Link } from "react-router-dom"

function HomePage(){
    return(
      <div className="tp">
        <PageTitleElement>Welcome back, Partycipant!🎉</PageTitleElement>
        <p className="hello">What do you want to do today?</p>
          <div class="carts">
              <Link to="/create-survey" ><CardElement className='FirstBox'> Create a brandnew Survey ❔</CardElement></Link>
              <Link to="/surveys"><CardElement className='FirstBox'>View Results of your Surveys 📊</CardElement></Link>
          </div>
          <div class="carts-two">
            <Link to="/my-account"><CardElement className='SecondBox'>Change Settings of your Account 🙂</CardElement></Link>
            <Link to="/get-help"><CardElement className='SecondBox'>Get Help in our FAQs 🤝</CardElement></Link>
          </div>
      </div>
    )
  }


  export default HomePage*/
  
  


  
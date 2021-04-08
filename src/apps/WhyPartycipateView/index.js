import "./style.css"
import PageTitleElement from "../PageTitleElement"
import DemoElement from "../DemoElement"


export default function WhyPartycipateView(){
    return(
        <div className="why-participate">
            <div>
                <PageTitleElement className="pageelement">Why choose Partycipate? 🎉</PageTitleElement>
                <p>You want to investigate a question, receive feedback on a product/service or measure customer satisfaction?</p>
                <p>At the same time you do not have the time or resources to dive deeper into the development of surveys?</p>
                <p>Welcome to Partycipate, where you neither have to worry about technology or choosing the right survey type.</p>
            </div>
            <div>
                <DemoElement/>
            </div>
        </div>
    )
}
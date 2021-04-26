import "./style.css"
import { StandardPage } from "../../utilElements"
import DemoElement from "../DemoElement"


export function WhyPartycipateView(){
    return(
        <div className="why-participate">
            <StandardPage containerClassName="wpv-column" title="Why choose Partycipate? 🎉">
                <p>You want to investigate a question, receive feedback on a product/service or measure customer satisfaction?</p>
                <p>At the same time you do not have the time or resources to dive deeper into the development of surveys?</p>
                <p>Welcome to Partycipate, where you neither have to worry about technology or choosing the right survey type.</p>
            </StandardPage>
            <div className="wpv-column">
                <DemoElement/>
            </div>
        </div>
    )
}
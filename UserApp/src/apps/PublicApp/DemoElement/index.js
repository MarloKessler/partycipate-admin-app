import "./style.css"
import { CardElement } from "../../utilElements"


export default function DemoElement() {
    return(
        <div className="demo-element">
            <CardElement className="primary-element de-ce ce-multiple-choice">
                <span>Multiple-choice <br/>Surveys</span>
                <div className="ce-separator"/>
                <img src={`${process.env.PUBLIC_URL}/images/Balkendiagramm.png`} alt="Image of bar chart"/>
            </CardElement>
            <CardElement className="primary-element de-ce ce-single-choice">
                <span>Single-choice <br/>Surveys</span>
                <div className="ce-separator"/>
                <img src={`${process.env.PUBLIC_URL}/images/Kreisdiagramm.png`} alt="Image of doughnut diagram"/>
            </CardElement>
        </div>
    )
}
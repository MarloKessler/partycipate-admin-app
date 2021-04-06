import CardElement from "../CardElement"
import "./style.css"


export default function DemoElement(){
    return(
        <div className="demo-element">
            <CardElement className="de-ce ce-multiple-choice">
                <span>Multiple-choice Surveys</span>
                <div className="ce-separator"/>
                <img src={`${process.env.PUBLIC_URL}/images/Balkendiagramm.png`}/>
            </CardElement>
            <CardElement className="de-ce ce-single-choice">
                <span>Single-choice Surveys</span>
                <div className="ce-separator"/>
                <img src={`${process.env.PUBLIC_URL}/images/Kreisdiagramm.png`}/>
            </CardElement>
        </div>
    )
}
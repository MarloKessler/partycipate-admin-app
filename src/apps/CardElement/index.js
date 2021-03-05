import "./style.css";
import React,{useState} from 'react';


function CardElement(props){
    const [content] = useState(props.content)
    return(
        <div className="CardElement">
                <p className="CardElement">{content}</p>
        </div>
    )
}

export default CardElement
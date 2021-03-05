import "./style.css";
import React,{useState} from 'react';


class CardElement extends React.Component {
    constructor(props) {
        super(props)
        this.children = props.children
        this.className = props.className || ""
    }

    render() {
        return(
            <div className={ `CardElement ${this.className}` }>
                { this.children }
            </div>
        )
    }
}

/*
function CardElement({ children, className = "", ...props }){
    return(
        <div className={ `CardElement ${className}` } {...props}>
            { children }
        </div>
    )
}
*/
export default CardElement
import "./style.css";
import React,{ Component } from 'react';




function PageTitleElement({ children, className = "" }) {

    return(
        <div className={ `page-title-element ${className}` }>
            <h1 className="PageTitle">{ children }</h1>
            <hr style={{
                color: "black",
                backgroundColor: "black",
                height: 0.5,
                marginLeft: 20,
                width: 60
            }}/>
        </div>
    )
}

export default PageTitleElement

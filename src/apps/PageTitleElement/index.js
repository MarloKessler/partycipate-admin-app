import "./style.css";
import React,{ Component } from 'react';


class PageTitleElement extends Component {

    render(){
        return(
            <div>
                <h1 className="PageTitle">{ this.props.children }</h1>
                <hr className="PageTitleUnderline"/>
            </div>
        )
    }
}

export default PageTitleElement

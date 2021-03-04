import "./style.css";
import React,{Component} from 'react';


class PageTitleElement extends Component{

    render(){
        return(
            <div className="PageTitle">
                <h1 className="PageTitle">Create your survey with our simple module kit</h1>
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
}

export default PageTitleElement
     



import "./style.css"
import { FiTrash2 } from "react-icons/fi"


export { XCoiceBlock }


function XCoiceBlock({ content }) {
    console.log("Content: ", content)
    return (
        <div className="content-block xchoice-block">
            { content.answers.map( (answer, index) => {
                return <div key={ index }><input className="input" type="text" value={ answer }/><button className="item trash-btn"><FiTrash2/></button></div>
            }) }
        </div>
    )
}
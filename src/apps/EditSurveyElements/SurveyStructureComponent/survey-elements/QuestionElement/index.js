import "./style.css"
import { XCoiceBlock } from "./content-blocks"


export { QuestionElement }


function QuestionElement({ element, key }) {
    return (
        <div className="survey-element" key={ key }>
            <label>Define your question</label>
            <input className="input s-question-input" type="text" value={ element.content.question }/>

            <label>Set your answer possibilities</label>
            <XCoiceBlock content={ element.content } />
        </div>
    )
}
import { h } from "preact"
import { useContext } from "preact/hooks"
import SurveyContext from "../../SurveyContext"
import { XCoiceBlock } from "./content-blocks/"



export { QuestionElement }


function QuestionElement({ index, ...props }) {
    const { survey } = useContext(SurveyContext)
    const element = survey.elements[index]

    return (
        <div { ...props }>
            <h3 className="question">{ element.question }</h3>
            <XCoiceBlock elementIndex={ index } />
        </div>
    )
}

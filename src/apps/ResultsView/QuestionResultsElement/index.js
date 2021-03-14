import "./style.css"
import CardElement from "../../CardElement"
import DoughnutChart from "./charts/DoughnutChart"
import BarChart from "./charts/BarChart"


export default QuestionResultsElement


function QuestionResultsElement({ element }) {
    return (
        <CardElement className="results-element">
            <div className="re-header">
                <h3>{ element.content.question }</h3>
                <h4></h4>
            </div>
            <p><small>{ getElementTypeLabel(element.type) }</small></p>
            <ResultsChart element={ element } />
        </CardElement>
    )
}


const getTotalVotes(element) {
    
}


function getElementTypeLabel(type) {
    switch (type) {
        case "single-choice": return "Single Choice"
        case "multiple-choice": return "Multiple Choice" 
        default: return ""
    }
}


function ResultsChart({ element }) {
    switch (element.type) {
        case "single-choice": return <DoughnutChart element={ element }/>
        case "multiple-choice": return <BarChart element={ element }/>
        default: <div>no chart type match</div>
    }
}

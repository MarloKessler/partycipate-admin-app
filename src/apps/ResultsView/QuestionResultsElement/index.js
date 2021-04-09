import "./style.css"
import CardElement from "../../CardElement"
import DoughnutChart from "./charts/DoughnutChart"
import BarChart from "./charts/BarChart"
import TrendChart from "./charts/TrendChart"


export default QuestionResultsElement


function QuestionResultsElement({ element }) {
    return (
        <CardElement className="results-element">
            <div className="re-header">
                <div className="re-header-first-line">
                    <h3>{ element.question }</h3>
                    <h4 className="re-total-votes">{ element.count_participants } Participants</h4>
                </div>
                <p><small>{ getElementTypeLabel(element.type) }</small></p>
            </div>
            <ResultsChart element={ element } />
        </CardElement>
    )
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
        case "single-choice": 
           return <div><DoughnutChart element={ element }/> <br/><br/><br/> <TrendChart element={ element }/> </div>
        case "multiple-choice": 
            return <div><BarChart element={ element }/> <br/><br/><br/> <TrendChart element={ element }/> </div>
        default: return <div>Chart not available</div>
    }
}

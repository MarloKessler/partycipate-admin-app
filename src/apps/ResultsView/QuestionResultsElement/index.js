//import "./style.css"
import DoughnutChart from "./charts/DoughnutChart"
import BarChart from "./charts/BarChart"


export default QuestionResultsElement


function QuestionResultsElement({ element }) {
  console.log(element)
    return (
        <div className="results-element">
            <h3>{ element.content.question }</h3>
            <p><small>{ getElementTypeLabel(element.type) }</small></p>
            <ResultsChart element={ element } />
            <p>kjhtkvdhsf</p>
        </div>
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
      case "single-choice": return <DoughnutChart element={ element }/>
      case "multiple-choice": return <BarChart element={ element }/>
      default: <div>no chart type match</div>
  }
}

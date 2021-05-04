import "./style.css"
import { CardElement, PaginationElement } from "../../../utilElements"
import DoughnutChart from "./charts/DoughnutChart"
import BarChart from "./charts/BarChart"
import TrendChart, { TrendChartMode } from "./charts/TrendChart"
import { useState } from "react"


export default function QuestionResultsElement({ className="", element }) {
    const [trendChartMode, setTrendChartMode] = useState(TrendChartMode.single)
    return (
        <CardElement className={`results-element ${className}`}>
            <div className="re-header">
                <div className="re-header-first-line">
                    <h2>{ element.question }</h2>
                    <h4 className="re-total-votes">{element.count_participants} Participants</h4>
                </div>
                <p>{getElementTypeLabel(element.type)}</p>
            </div>
            <PaginationElement>
                <div className="results-group">
                    <h3>Total results</h3>
                    { element.count_participants > 0
                        ? <ResultsChart element={element} />
                        : <p>No enough answers to display valid results.</p>
                    }
                </div>
                <div className="results-group">
                    <div>
                        <h3>Results over time</h3>
                        <div className="btn-group">
                            <button className={`btn-light ${trendChartMode === TrendChartMode.single ? "selected" : ""}`} onClick={() => setTrendChartMode(TrendChartMode.single)}>Single</button>
                            <button className={`btn-light ${trendChartMode === TrendChartMode.stacked ? "selected" : ""}`} onClick={() => setTrendChartMode(TrendChartMode.stacked)}>Stacked</button>
                        </div>
                    </div>
                    { element.datetime_result
                        ? <TrendChart element={element} mode={trendChartMode}/>
                        : <p>No enough answers to display valid results.</p>
                    }
                </div>
            </PaginationElement>
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
        case "single-choice": return <DoughnutChart element={ element }/>
        case "multiple-choice": return <BarChart element={ element }/>
        default: return <div>Chart not available</div>
    }
}

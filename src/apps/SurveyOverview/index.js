import "./style.css"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"

export default () => {
    const history = useHistory()
    const [surveys, setSurveys] = useState()
    const [errorOccured, setErrorOccured] = useState()

    useEffect(() => {
        Server.database().getSurveys()
        .then(setSurveys)
        .catch(() => setErrorOccured(true))
    }, [])

    return (
        <div className = "survey-table">
        <PageTitleElement>Which results do you want to see?</PageTitleElement>
        <div className="survey-overview">
             { surveys
                ? <table className="survey-table">
                    <tbody>
                        {
                            surveys.map( survey => {
                                return (
                                    <tr key={ survey.id } onClick={ () => history.push(`/surveys/${survey.id}`) }>
                                        <td>{ survey.title }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                : errorOccured
                    ? <div>We are sorry, your surveys couldn't be loaded!</div>
                    : <div>Loading surveys…</div>
            }
        </div>
        </div>
    )
}
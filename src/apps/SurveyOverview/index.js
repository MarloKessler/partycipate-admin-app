import "./style.css"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Server from "../Server"
import PageTitleElement from "../PageTitleElement"

export default () => {
    const history = useHistory()
    const [surveys, setSurveys] = useState()
    {/*const errorVariable = "Sorry, an error occured!"*/}

    useEffect(() => {
        Server.database().getSurveys()
        .then(setSurveys)
        {/*.catch(errorVariable)*/}
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
                : <div>Loading surveys…</div>
            }
        </div>
        </div>
    )
}